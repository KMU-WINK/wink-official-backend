import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import {
  LoginRequestDto,
  LoginResponseDto,
  MyInfoResponseDto,
  RegisterRequestDto,
  SendCodeRequestDto,
  VerifyCodeRequestDto,
  VerifyCodeResponseDto,
} from '../dto';
import {
  AlreadyRegisteredByEmailException,
  AlreadyRegisteredByStudentIdException,
  InvalidVerifyCodeException,
  InvalidVerifyTokenException,
  MemberNotFoundException,
  WrongPasswordException,
} from '../exception';

import { MemberRepository } from '../../member/repository';
import { Member, transferMember } from '../../member/schema';
import { NotApprovedMemberException } from '../../member/exception';

import { RedisRepository } from '../../../common/redis';
import {
  MailService,
  RegisterCompleteTemplate,
  VerifyCodeTemplate,
} from '../../../common/utils/mail';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    @Inject(`${RedisRepository.name}-code`) private readonly redisCodeRepository: RedisRepository,
    @Inject(`${RedisRepository.name}-token`) private readonly redisTokenRepository: RedisRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    if (!(await this.memberRepository.existsByEmail(email))) {
      throw new MemberNotFoundException();
    }

    const {
      _id,
      password: memberPassword,
      approved,
    } = <Member>await this.memberRepository.findByEmailWithPassword(email);

    if (!(await bcrypt.compare(password, memberPassword))) {
      throw new WrongPasswordException();
    }

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    const token = await this.jwtService.signAsync({ id: _id });

    return { token };
  }

  async register({ name, studentId, password, verifyToken }: RegisterRequestDto): Promise<void> {
    if (!(await this.redisTokenRepository.exists(verifyToken))) {
      throw new InvalidVerifyTokenException();
    }

    const email = <string>await this.redisTokenRepository.get(verifyToken);

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

    this.mailService.sendTemplate(email, new RegisterCompleteTemplate(name)).then((_) => _);
  }

  async sendCode({ email }: SendCodeRequestDto): Promise<void> {
    if (await this.memberRepository.existsByEmail(email)) {
      throw new AlreadyRegisteredByEmailException();
    }

    const code = Math.floor(Math.random() * 1_000_000)
      .toString()
      .padStart(6, '0');

    await this.redisCodeRepository.ttl(email, code, 60 * 10);

    this.mailService.sendTemplate(email, new VerifyCodeTemplate(email, code)).then((_) => _);
  }

  async verifyCode({ email, code }: VerifyCodeRequestDto): Promise<VerifyCodeResponseDto> {
    const storedCode = await this.redisCodeRepository.get(email);

    if (storedCode !== code) {
      throw new InvalidVerifyCodeException();
    }

    await this.redisCodeRepository.delete(email);

    const verifyToken = uuid();
    await this.redisTokenRepository.ttl(verifyToken, email, 60 * 60);

    return { verifyToken };
  }

  myInfo(member: Member): MyInfoResponseDto {
    return <MyInfoResponseDto>transferMember(member, ['approved']);
  }
}
