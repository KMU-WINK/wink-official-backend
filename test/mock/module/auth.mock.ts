import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';

import {
  mockConfigService,
  mockMailService,
  mockMemberRepository,
  mockRedisService,
} from '@wink/test-mock';

import { AuthController } from '@wink/auth/controller';
import { AuthService } from '@wink/auth/service';

import { MemberRepository } from '@wink/member/repository';
import { Member } from '@wink/member/schema';

import { RedisService } from '@wink/redis';
import { MailService } from '@wink/mail';
import { ConfigService } from '@nestjs/config';

export const mockAuth = async () => {
  const memoryMemberRepository: Member[] = [];
  const memoryRedisRefreshRepository: Record<string, string> = {};
  const memoryRedisCodeRepository: Record<string, string> = {};
  const memoryRedisTokenRepository: Record<string, string> = {};

  const module = await Test.createTestingModule({
    imports: [
      JwtModule.register({
        secret: 'jwt_secret_for_test',
      }),
      EventEmitterModule.forRoot(),
    ],
    controllers: [AuthController],
    providers: [
      AuthService,
      { provide: ConfigService, useValue: mockConfigService() },
      { provide: MemberRepository, useValue: mockMemberRepository(memoryMemberRepository) },
      { provide: MailService, useValue: mockMailService() },
      {
        provide: `${RedisService.name}-refresh`,
        useValue: mockRedisService(memoryRedisRefreshRepository),
      },
      {
        provide: `${RedisService.name}-code`,
        useValue: mockRedisService(memoryRedisCodeRepository),
      },
      {
        provide: `${RedisService.name}-token`,
        useValue: mockRedisService(memoryRedisTokenRepository),
      },
    ],
  }).compile();

  return {
    module,
    memoryMemberRepository,
    memoryRedisRefreshRepository,
    memoryRedisCodeRepository,
    memoryRedisTokenRepository,
  };
};
