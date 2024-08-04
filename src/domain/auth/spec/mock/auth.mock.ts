import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '../../auth.controller';
import { AuthService } from '../../auth.service';

import { Member } from '../../../member/member.schema';
import { MemberRepository } from '../../../member/member.repository';

import {
  MailService,
  mockMailService,
  mockMemberRepository,
  mockRedisRepository,
  RedisRepository,
} from '../../../../utils';

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
