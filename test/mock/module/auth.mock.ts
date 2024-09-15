import { ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { AuthController } from '@wink/auth/controller';
import { AuthService } from '@wink/auth/service';

import { MemberRepository } from '@wink/member/repository';
import { Member } from '@wink/member/schema';

import { MailService } from '@wink/mail';

import {
  mockConfigService,
  mockMailService,
  mockMemberRepository,
  mockRedisService,
} from '@wink/test-mock';

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
        provide: 'REDIS_SERVICE_VERIFY_CODE',
        useValue: mockRedisService(memoryRedisCodeRepository),
      },
      {
        provide: 'REDIS_SERVICE_VERIFY_TOKEN',
        useValue: mockRedisService(memoryRedisTokenRepository),
      },
      {
        provide: 'REDIS_SERVICE_REFRESH_TOKEN',
        useValue: mockRedisService(memoryRedisRefreshRepository),
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
