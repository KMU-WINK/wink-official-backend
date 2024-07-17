/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { NodeMail } from '../../utils/mail/NodeMail';
import { RedisRepository } from '../../utils/redis/RedisRepository';

import { InvalidVerifyCodeException } from './exception/InvalidVerifyCodeException';

@Injectable()
export class AuthService {
  constructor(
    private readonly nodeMail: NodeMail,
    private readonly redis: RedisRepository,
  ) {}

  async login(email: string, password: string): Promise<string> {
    return '';
  }

  async register(
    name: string,
    studentId: number,
    password: string,
    verifyToken: string,
  ): Promise<void> {}

  async sendCode(email: string): Promise<void> {
    const code = Math.floor(Math.random() * 1_000_000)
      .toString()
      .padStart(6, '0');

    await this.redis.setex(email, code, 60 * 10);

    await this.nodeMail.sendMail(email, '[WINK] 회원가입 인증코드', `인증코드: ${code}`);
  }

  async verifyCode(email: string, code: string): Promise<string> {
    const storedCode = await this.redis.get(email);

    if (storedCode !== code) {
      throw new InvalidVerifyCodeException();
    }

    await this.redis.delete(email);

    const verifyToken = uuid();
    await this.redis.setex(verifyToken, email, 60 * 60);

    return verifyToken;
  }
}
