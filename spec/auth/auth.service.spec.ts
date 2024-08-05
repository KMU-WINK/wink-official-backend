import { mockAuth } from './auth.mock';

import * as bcrypt from 'bcrypt';

import { AuthService } from '../../src/domain/auth/auth.service';
import {
  AlreadyRegisteredByEmailException,
  AlreadyRegisteredByStudentIdException,
  InvalidVerifyCodeException,
  InvalidVerifyTokenException,
  MemberNotFoundException,
  WrongPasswordException,
} from '../../src/domain/auth/exception';

import { Member } from '../../src/domain/member/member.schema';

describe('Auth Service Test', () => {
  let authService: AuthService;

  let memoryMemberRepository: Member[];
  let memoryRedisRepository: Record<string, string>;

  beforeAll(async () => {
    const mock = await mockAuth();

    const { module } = mock;
    ({ memoryMemberRepository, memoryRedisRepository } = mock);

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    memoryMemberRepository.splice(0, memoryMemberRepository.length);
    Object.keys(memoryRedisRepository).forEach((key) => {
      delete memoryRedisRepository[key];
    });
  });

  describe('로그인', () => {
    it('존재하지 않는 멤버일 때', async () => {
      // Given

      // When
      const result = authService.login('not-exists@gmail.com', 'p4sSw0rd!');

      // Then
      await expect(result).rejects.toThrow(MemberNotFoundException);
    });

    it('잘못된 비밀번호일 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const password = 'p4sSw0rd!';

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      memoryMemberRepository.push({
        _id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        email,
        password: hashPassword,
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 0,
        approved: undefined,
      });

      // When
      const result = authService.login(email, `${password}!`);

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
        _id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        email,
        password: hash,
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 0,
        approved: true,
      });

      // When
      const result = authService.login(email, password);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('회원가입', () => {
    it('인증 토큰이 존재하지 않을 때', async () => {
      // Given

      // When
      const result = authService.register('', 0, '', 'empty-token');

      // Then
      await expect(result).rejects.toThrow(InvalidVerifyTokenException);
    });

    it('이미 가입된 이메일일 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const password = 'p4sSw0rd!';
      const verifyToken = 'verify-token';

      memoryMemberRepository.push({
        _id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        email,
        password,
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 0,
        approved: undefined,
      });

      memoryRedisRepository[verifyToken] = email;

      // When
      const result = authService.register('', 0, password, verifyToken);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByEmailException);
    });

    it('이미 가입된 학번일 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const password = 'p4sSw0rd!';
      const verifyToken = 'verify-token';

      memoryMemberRepository.push({
        _id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        email: `other_${email}`,
        password: '',
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 20240001,
        approved: undefined,
      });

      memoryRedisRepository[verifyToken] = email;

      // When
      const result = authService.register('', 20240001, password, verifyToken);

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
      const result = authService.register('', 20240001, password, verifyToken);

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
        _id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        email: email,
        password: '',
        fee: false,
        link: undefined,
        name: '',
        role: undefined,
        studentId: 20240001,
        approved: undefined,
      });

      // When
      const result = authService.sendCode(email);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByEmailException);
    });

    it('올바른 정보가 주어졌을 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';

      // When
      const result = authService.sendCode(email);

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
      const result = authService.verifyCode(email, code);

      // Then
      await expect(result).rejects.toThrow(InvalidVerifyCodeException);
    });

    it('올바른 정보가 주어졌을 때', async () => {
      // Given
      const email = 'honggildong@gmail.com';
      const code = '123456';

      memoryRedisRepository[email] = code;

      // When
      const result = authService.verifyCode(email, code);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });
});
