import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';

import { MemberRepository } from '../member/member.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(
    private configService: ConfigService,
    private memberRepository: MemberRepository,
  ) {
    this.jwtSecret = this.configService.get<string>('jwt.secret');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7);

      if (jwt.verify(token, this.jwtSecret)) {
        const id = jwt.decode(authorization.slice(7))['id'];

        return await this.memberRepository.existsById(id);
      }
    }

    return false;
  }
}
