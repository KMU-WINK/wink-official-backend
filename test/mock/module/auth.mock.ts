import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { mockMailService, mockMemberRepository, mockRedisService } from '@wink/test-mock';

import { AuthController } from '@wink/auth/controller';
import { AuthService } from '@wink/auth/service';

import { MemberRepository } from '@wink/member/repository';
import { Member } from '@wink/member/schema';

import { RedisService } from '@wink/redis';
import { MailService } from '@wink/mail';

export const mockAuth = async () => {
  const memoryMemberRepository: Member[] = [];
  const memoryRedisCodeRepository: Record<string, string> = {};
  const memoryRedisTokenRepository: Record<string, string> = {};

  const module = await Test.createTestingModule({
    imports: [
      JwtModule.register({
        secret: 'jwt_secret_for_test',
        signOptions: { expiresIn: '1h' },
      }),
      EventEmitterModule.forRoot(),
    ],
    controllers: [AuthController],
    providers: [
      AuthService,
      { provide: MemberRepository, useValue: mockMemberRepository(memoryMemberRepository) },
      { provide: MailService, useValue: mockMailService() },
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
    memoryRedisCodeRepository,
    memoryRedisTokenRepository,
  };
};
