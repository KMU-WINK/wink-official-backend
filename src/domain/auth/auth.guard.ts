import { Reflector } from '@nestjs/core';
import {
  applyDecorators,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';

import { MemberRepository } from '../member/member.repository';

import { Role } from '../member/constant/Role';

import { UnauthorizedException, PermissionException } from './exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractAuthToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    let decoded: Record<string, any>;
    try {
      decoded = await this.jwtService.verifyAsync(token as string);
    } catch {
      throw new UnauthorizedException();
    }

    if (!decoded?.id) {
      throw new UnauthorizedException();
    }

    const member = await this.memberRepository.findById(decoded.id);
    request.member = member;
    if (!member) {
      throw new UnauthorizedException();
    }

    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (roles.length > 0 && !roles.includes(member.role)) {
      throw new PermissionException();
    }

    return true;
  }

  private extractAuthToken(request: Request): string | boolean {
    const authorization = request.headers['authorization'];

    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.slice(7);
    }

    return false;
  }
}

export const ReqMember = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.member;
});

export const AuthAnyAccount = () =>
  applyDecorators(
    SetMetadata(
      'roles',
      Object.keys(Role).map((key) => Role[key as keyof typeof Role]),
    ),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
  );

export const AuthMemberAccount = () =>
  applyDecorators(
    SetMetadata(
      'roles',
      Object.keys(Role)
        .map((key) => Role[key as keyof typeof Role])
        .filter((role) => role !== Role.WAITING),
    ),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
  );

export const AuthAdminAccount = () =>
  applyDecorators(
    SetMetadata(
      'roles',
      Object.keys(Role)
        .map((key) => Role[key as keyof typeof Role])
        .filter((role) => role !== Role.WAITING && role !== Role.MEMBER),
    ),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
  );
