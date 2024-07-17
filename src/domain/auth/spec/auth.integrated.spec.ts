import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';

import { AuthController } from '../../auth.controller';
import { AuthService } from '../../auth.service';

import { MemberRepository } from '../../../member/member.repository';
import { NodeMail } from '../../../../utils/mail/NodeMail';
import { RedisRepository } from '../../../../utils/redis/RedisRepository';

import { Member } from '../../../member/member.schema';

import { SendCodeRequest } from '../request/SendCodeRequest';
import { VerifyCodeRequest } from '../request/VerifyCodeRequest';
import { RegisterRequest } from '../request/RegisterRequest';

describe('Auth 통합 테스트', () => {
  let controller: AuthController;

  let memoryMemberRepository: Member[] = [];
  let memoryRedisRepository: Record<string, string> = {};

  beforeAll(async () => {
    const mockConfigService = {
      get: (key: string) => {
        switch (key) {
          case 'jwt.secret':
            return 'test';
          case 'jwt.expiresIn':
            return '1h';
        }
      },
    };

    const mockMemberRepository = {
      existsByEmail: (email: string) =>
        memoryMemberRepository.find((member) => member.email === email),
      existsByStudentId: (studentId: number) =>
        memoryMemberRepository.find((member) => member.studentId === studentId),
      save: (member: Member) => memoryMemberRepository.push(member),
      raw: () => ({
        findOne: (condition: Record<string, any>) => ({
          select: () => ({
            exec: () => memoryMemberRepository.find((member) => member.email === condition.email),
          }),
        }),
      }),
    };

    const mockNodeMail = {
      sendMail: jest.fn(),
    };

    const mockRedisRepository = {
      setex: (key: string, value: string) => (memoryRedisRepository[key] = value),
      exists: (key: string) => memoryRedisRepository[key] !== undefined,
      get: (key: string) => memoryRedisRepository[key],
      delete: (key: string) => delete memoryRedisRepository[key],
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: MemberRepository,
          useValue: mockMemberRepository,
        },
        {
          provide: NodeMail,
          useValue: mockNodeMail,
        },
        {
          provide: RedisRepository,
          useValue: mockRedisRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterAll(() => {
    memoryMemberRepository = [];
    memoryRedisRepository = {};
  });

  describe('통합 테스트', () => {
    const name = '홍길동';
    const studentId = 2024_0001;
    const email = 'honggildong@gmail.com';
    const password = 'p4sSw0rd!';

    let verifyToken: string;
    let token: string;

    it('인증코드 전송', async () => {
      // Given
      const request: SendCodeRequest = {
        email,
      };

      // When
      await controller.sendCode(request);

      // Then
      expect(memoryRedisRepository[email]).toBeDefined();
    });

    it('인증 토큰 발급', async () => {
      // Given
      const request: VerifyCodeRequest = { email, code: memoryRedisRepository[email] };

      // When
      const response = await controller.verifyCode(request);
      verifyToken = response.verifyToken;

      // Then
      expect(memoryRedisRepository[email]).toBeUndefined();
      expect(memoryRedisRepository[verifyToken]).toBe(email);
    });

    it('회원가입', async () => {
      // Given
      const request: RegisterRequest = { name, studentId, password, verifyToken };

      // When
      await controller.register(request);

      // Then
      expect(memoryRedisRepository[email]).toBeUndefined();
    });

    it('로그인', async () => {
      // Given
      const request = { email, password };

      // When
      const response = await controller.login(request);
      token = response.token;

      // Then
      const member = memoryMemberRepository.find((member) => member.email === email);
      expect(jwt.decode(token)['id']).toBe(member['_id']);
    });
  });
});
