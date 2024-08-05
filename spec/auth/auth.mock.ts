import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { mockMailService, mockMemberRepository, mockRedisRepository } from '../mock';

import { AuthController } from '../../src/domain/auth/auth.controller';
import { AuthService } from '../../src/domain/auth/auth.service';

import { Member } from '../../src/domain/member/member.schema';
import { MemberRepository } from '../../src/domain/member/member.repository';

import { RedisRepository } from '../../src/common/redis';
import { MailService } from '../../src/common/utils/mail';

export const mockAuth = async () => {
  const memoryMemberRepository: Member[] = [];
  const memoryRedisRepository: Record<string, string> = {};

  const module = await Test.createTestingModule({
    imports: [
      JwtModule.register({
        secret: 'jwt_secret_for_test',
        signOptions: { expiresIn: '1h' },
      }),
    ],
    controllers: [AuthController],
    providers: [
      AuthService,
      { provide: MemberRepository, useValue: mockMemberRepository(memoryMemberRepository) },
      { provide: RedisRepository, useValue: mockRedisRepository(memoryRedisRepository) },
      { provide: MailService, useValue: mockMailService() },
    ],
  }).compile();

  return {
    module,
    memoryMemberRepository,
    memoryRedisRepository,
  };
};
