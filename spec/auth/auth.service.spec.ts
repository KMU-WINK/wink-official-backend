import { mockAuth } from './auth.mock';

import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { AuthService } from '../../src/domain/auth/service';
import {
  AlreadyRegisteredByEmailException,
  AlreadyRegisteredByStudentIdException,
  InvalidVerifyCodeException,
  InvalidVerifyTokenException,
  MemberNotFoundException,
  WrongPasswordException,
} from '../../src/domain/auth/exception';

import { Member } from '../../src/domain/member/schema';

import { MailService } from '../../src/common/utils/mail';
import { Role } from '../../src/domain/member/constant';

describe('Auth Service Test', () => {
  let authService: AuthService;
  let mailService: MailService;

  let memoryMemberRepository: Member[];
  let memoryRedisCodeRepository: Record<string, string>;
  let memoryRedisTokenRepository: Record<string, string>;

  beforeAll(async () => {
    const mock = await mockAuth();

    const { module } = mock;
    ({ memoryMemberRepository, memoryRedisCodeRepository, memoryRedisTokenRepository } = mock);

    authService = module.get<AuthService>(AuthService);
    mailService = module.get<MailService>(MailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    memoryMemberRepository.splice(0, memoryMemberRepository.length);
    Object.keys(memoryRedisCodeRepository).forEach((key) => {
      delete memoryRedisCodeRepository[key];
    });
    Object.keys(memoryRedisTokenRepository).forEach((key) => {
      delete memoryRedisTokenRepository[key];
    });
  });

  describe('로그인', () => {
    it('존재하지 않는 멤버일 때', async () => {
      // Given

      // When
      const result = authService.login('not-exists@kookmin.ac.kr', 'p4sSw0rd!');

      // Then
      await expect(result).rejects.toThrow(MemberNotFoundException);
    });

    it('잘못된 비밀번호일 때', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';
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
      const email = 'honggildong@kookmin.ac.kr';
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
      const email = 'honggildong@kookmin.ac.kr';
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

      memoryRedisTokenRepository[verifyToken] = email;

      // When
      const result = authService.register('', 0, password, verifyToken);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByEmailException);
    });

    it('이미 가입된 학번일 때', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';
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

      memoryRedisTokenRepository[verifyToken] = email;

      // When
      const result = authService.register('', 20240001, password, verifyToken);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByStudentIdException);
    });

    it('올바른 정보가 주어졌을 때', async () => {
      // Given
      const name = '홍길동';
      const email = 'honggildong@kookmin.ac.kr';
      const password = 'p4sSw0rd!';
      const verifyToken = 'verify-token';

      memoryRedisTokenRepository[verifyToken] = email;

      // When
      const result = authService.register(name, 20240001, password, verifyToken);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository).toHaveLength(1);
      expect(memoryMemberRepository[0].email).toBe(email);
      expect(mailService.registerComplete).toHaveBeenCalledWith({ name });
    });
  });

  describe('인증코드 전송', () => {
    it('이미 가입된 이메일일 때', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';

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
      const email = 'honggildong@kookmin.ac.kr';

      // When
      const result = authService.sendCode(email);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryRedisCodeRepository[email]).toBeDefined();
      expect(mailService.verifyCode).toHaveBeenCalledWith({
        email,
        code: memoryRedisCodeRepository[email],
      });
    });
  });

  describe('인증 토큰 발급', () => {
    it('인증코드가 일치하지 않을 때', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';
      const code = '123456';

      memoryRedisCodeRepository[email] = '654321';

      // When
      const result = authService.verifyCode(email, code);

      // Then
      await expect(result).rejects.toThrow(InvalidVerifyCodeException);
    });

    it('올바른 정보가 주어졌을 때', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';
      const code = '123456';

      memoryRedisCodeRepository[email] = code;

      // When
      const result = authService.verifyCode(email, code);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('내 정보 조회', () => {
    it('내 정보 조회', async () => {
      // Given
      const member: Member = {
        _id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: uuid(),
        studentId: 20240001,
        email: uuid(),
        password: uuid(),
        avatar: uuid(),
        description: uuid(),
        link: {
          github: uuid(),
          instagram: uuid(),
          blog: uuid(),
        },
        role: Role.MEMBER,
        fee: true,
        approved: true,
      };

      // When
      const result = authService.myInfo(member);

      // Then
      expect(result).toMatchObject({
        memberId: member._id,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
        name: member.name,
        studentId: member.studentId,
        email: member.email,
        avatar: member.avatar,
        description: member.description,
        link: member.link,
        role: member.role,
        fee: member.fee,
      });
    });
  });
});
