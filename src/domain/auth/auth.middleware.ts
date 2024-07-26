import { createParamDecorator, ExecutionContext, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

import { MemberRepository } from '../member/member.repository';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private memberRepository: MemberRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];

    if (authorization) {
      const id = jwt.decode(authorization.slice(7))['id'];

      req['member'] = await this.memberRepository.findById(id);
    }

    next();
  }
}

export const ReqMember = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.member;
});
