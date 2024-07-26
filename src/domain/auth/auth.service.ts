import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { MemberRepository } from '../member/member.repository';
import { NodeMail } from '../../utils/mail/NodeMail';
import { RedisRepository } from '../../utils/redis/RedisRepository';

import { InvalidVerifyCodeException } from './exception/InvalidVerifyCodeException';
import { InvalidVerifyTokenException } from './exception/InvalidVerifyTokenException';
import { AlreadyRegisteredByEmailException } from './exception/AlreadyRegisteredByEmailException';
import { AlreadyRegisteredByStudentIdException } from './exception/AlreadyRegisteredByStudentIdException';
import { MemberNotFoundException } from './exception/MemberNotFoundException';
import { WrongPasswordException } from './exception/WrongPasswordException';
import { EmailTemplate } from './util/EmailTemplate';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly memberRepository: MemberRepository,
    private readonly redisRepository: RedisRepository,
    private readonly nodeMail: NodeMail,
  ) {
    this.jwtSecret = this.configService.get<string>('jwt.secret');
    this.jwtExpiresIn = this.configService.get<string>('jwt.expiresIn');
  }

  async login(email: string, password: string): Promise<string> {
    if (!(await this.memberRepository.existsByEmail(email))) {
      throw new MemberNotFoundException();
    }

    const member = await this.memberRepository.findByEmailWithPassword(email);

    if (!(await bcrypt.compare(password, member.password))) {
      throw new WrongPasswordException();
    }

    return jwt.sign({ id: member['_id'] }, this.jwtSecret, { expiresIn: this.jwtExpiresIn });
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
  }

  async sendCode(email: string): Promise<void> {
    if (await this.memberRepository.existsByEmail(email)) {
      throw new AlreadyRegisteredByEmailException();
    }

    const code = Math.floor(Math.random() * 1_000_000)
      .toString()
      .padStart(6, '0');

    await this.redisRepository.ttl(email, code, 60 * 10);

    await this.nodeMail.sendMail(
      email,
      '[WINK] 회원가입 인증코드',
      EmailTemplate.verifyCode(email, code),
    );
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
