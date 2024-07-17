import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { AuthService } from '../auth.service';

import { MemberRepository } from '../../member/member.repository';
import { NodeMail } from '../../../utils/mail/NodeMail';
import { RedisRepository } from '../../../utils/redis/RedisRepository';

import { Member } from '../../member/member.schema';

import { MemberNotFoundException } from '../exception/MemberNotFoundException';
import { WrongPasswordException } from '../exception/WrongPasswordException';
import { AlreadyRegisteredByEmailException } from '../exception/AlreadyRegisteredByEmailException';
import { AlreadyRegisteredByStudentIdException } from '../exception/AlreadyRegisteredByStudentIdException';
import { InvalidVerifyTokenException } from '../exception/InvalidVerifyTokenException';
import { InvalidVerifyCodeException } from '../exception/InvalidVerifyCodeException';

describe('Auth Service 테스트', () => {
  let service: AuthService;

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

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    memoryMemberRepository = [];
    memoryRedisRepository = {};
  });

  describe('로그인', () => {
    it('존재하지 않는 유저일 때', async () => {
      // Given

      // When
      const result = service.login('not-exists@gmail.com', 'p4sSw0rd!');

      // Then
      await expect(result).rejects.toThrow(MemberNotFoundException);
    });

    it('잘못된 비밀번호일 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const password = 'p4sSw0rd!';

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      memoryMemberRepository.push({
        email,
        password: hash,
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 0,
      });

      // When
      const result = service.login(email, `${password}!`);

      // Then
      await expect(result).rejects.toThrow(WrongPasswordException);
    });

    it('올바른 정보가 주어졌을 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const password = 'p4sSw0rd!';

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      memoryMemberRepository.push({
        email,
        password: hash,
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 0,
      });

      // When
      const result = service.login(email, password);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('회원가입', () => {
    it('인증 토큰이 존재하지 않을 때', async () => {
      // Given

      // When
      const result = service.register('', 0, '', 'empty-token');

      // Then
      await expect(result).rejects.toThrow(InvalidVerifyTokenException);
    });

    it('이미 가입된 이메일일 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const password = 'p4sSw0rd!';
      const verifyToken = 'verify-token';

      memoryMemberRepository.push({
        email,
        password,
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 0,
      });

      memoryRedisRepository[verifyToken] = email;

      // When
      const result = service.register('', 0, password, verifyToken);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByEmailException);
    });

    it('이미 가입된 학번일 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const password = 'p4sSw0rd!';
      const verifyToken = 'verify-token';

      memoryMemberRepository.push({
        email: `other_${email}`,
        password: '',
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 20240001,
      });

      memoryRedisRepository[verifyToken] = email;

      // When
      const result = service.register('', 20240001, password, verifyToken);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByStudentIdException);
    });

    it('올바른 정보가 주어졌을 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const password = 'p4sSw0rd!';
      const verifyToken = 'verify-token';

      memoryRedisRepository[verifyToken] = email;

      // When
      const result = service.register('', 20240001, password, verifyToken);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository).toHaveLength(1);
      expect(memoryMemberRepository[0].email).toBe(email);
    });
  });

  describe('인증코드 전송', () => {
    it('이미 가입된 이메일일 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';

      memoryMemberRepository.push({
        email: email,
        password: '',
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 20240001,
      });

      // When
      const result = service.sendCode(email);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByEmailException);
    });

    it('올바른 정보가 주어졌을 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';

      // When
      const result = service.sendCode(email);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryRedisRepository[email]).toBeDefined();
    });
  });

  describe('인증 토큰 발급', () => {
    it('인증코드가 일치하지 않을 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const code = '123456';

      memoryRedisRepository[email] = '654321';

      // When
      const result = service.verifyCode(email, code);

      // Then
      await expect(result).rejects.toThrow(InvalidVerifyCodeException);
    });

    it('올바른 정보가 주어졌을 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const code = '123456';

      memoryRedisRepository[email] = code;

      // When
      const result = service.verifyCode(email, code);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });
});
