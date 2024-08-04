import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { MemberRepository } from '../member/member.repository';

import {
  AlreadyRegisteredByEmailException,
  AlreadyRegisteredByStudentIdException,
  InvalidVerifyCodeException,
  InvalidVerifyTokenException,
  MemberNotFoundException,
  WrongPasswordException,
} from './exception';

import { RedisRepository, MailService } from '../../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly redisRepository: RedisRepository,
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

    return this.jwtService.signAsync({ id: member['_id'] });
  }

  async register(
    name: string,
    studentId: number,
    password: string,
    verifyToken: string,
  ): Promise<void> {
    if (!(await this.redisRepository.exists(verifyToken))) {
      throw new InvalidVerifyTokenException();
    }

    const email = await this.redisRepository.get(verifyToken);

    if (await this.memberRepository.existsByEmail(email)) {
      throw new AlreadyRegisteredByEmailException();
    }

    if (await this.memberRepository.existsByStudentId(studentId)) {
      throw new AlreadyRegisteredByStudentIdException();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await this.memberRepository.save({ name, studentId, email, password: hash });

    await this.redisRepository.delete(verifyToken);

    this.mailService.registerComplete({ name }).send(email);
  }

  async sendCode(email: string): Promise<void> {
    if (await this.memberRepository.existsByEmail(email)) {
      throw new AlreadyRegisteredByEmailException();
    }

    const code = Math.floor(Math.random() * 1_000_000)
      .toString()
      .padStart(6, '0');

    await this.redisRepository.ttl(email, code, 60 * 10);

    this.mailService.verifyCode({ email, code }).send(email);
  }

  async verifyCode(email: string, code: string): Promise<string> {
    const storedCode = await this.redisRepository.get(email);

    if (storedCode !== code) {
      throw new InvalidVerifyCodeException();
    }

    await this.redisRepository.delete(email);

    const verifyToken = uuid();
    await this.redisRepository.ttl(verifyToken, email, 60 * 60);

    return verifyToken;
  }
}
