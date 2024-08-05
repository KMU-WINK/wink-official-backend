import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import {
  AlreadyRegisteredByEmailException,
  AlreadyRegisteredByStudentIdException,
  InvalidVerifyCodeException,
  InvalidVerifyTokenException,
  MemberNotFoundException,
  WrongPasswordException,
} from '../exception';

import { MemberRepository } from '../../member/repository';
import { Member } from '../../member/schema';
import { NotApprovedMemberException } from '../../member/exception';

import { RedisRepository } from '../../../common/redis';
import { MailService } from '../../../common/utils/mail';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    @Inject(`${RedisRepository.name}-code`) private readonly redisCodeRepository: RedisRepository,
    @Inject(`${RedisRepository.name}-token`) private readonly redisTokenRepository: RedisRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    if (!(await this.memberRepository.existsByEmail(email))) {
      throw new MemberNotFoundException();
    }

    const member = await this.memberRepository.findByEmailWithPassword(email);

    if (!(await bcrypt.compare(password, member.password))) {
      throw new WrongPasswordException();
    }

    if (!member.approved) {
      throw new NotApprovedMemberException();
    }

    return this.jwtService.signAsync({ id: member._id });
  }

  async register(
    name: string,
    studentId: number,
    password: string,
    verifyToken: string,
  ): Promise<void> {
    if (!(await this.redisTokenRepository.exists(verifyToken))) {
      throw new InvalidVerifyTokenException();
    }

    const email = await this.redisTokenRepository.get(verifyToken);

    if (await this.memberRepository.existsByEmail(email)) {
      throw new AlreadyRegisteredByEmailException();
    }

    if (await this.memberRepository.existsByStudentId(studentId)) {
      throw new AlreadyRegisteredByStudentIdException();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await this.memberRepository.save({ name, studentId, email, password: hash });

    await this.redisTokenRepository.delete(verifyToken);

    this.mailService.registerComplete({ name }).send(email);
  }

  async sendCode(email: string): Promise<void> {
    if (await this.memberRepository.existsByEmail(email)) {
      throw new AlreadyRegisteredByEmailException();
    }

    const code = Math.floor(Math.random() * 1_000_000)
      .toString()
      .padStart(6, '0');

    await this.redisCodeRepository.ttl(email, code, 60 * 10);

    this.mailService.verifyCode({ email, code }).send(email);
  }

  async verifyCode(email: string, code: string): Promise<string> {
    const storedCode = await this.redisCodeRepository.get(email);

    if (storedCode !== code) {
      throw new InvalidVerifyCodeException();
    }

    await this.redisCodeRepository.delete(email);

    const verifyToken = uuid();
    await this.redisTokenRepository.ttl(verifyToken, email, 60 * 60);

    return verifyToken;
  }

  myInfo(member: Member): Omit<Member, '_id'> & { memberId: string } {
    const { _id: memberId, ...rest } = member['_doc'];

    return { memberId, ...rest };
  }
}
