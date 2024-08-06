import { mockAuth } from './auth.mock';
import { createNullMember } from '../member/fake-members.mock';

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

describe('AuthService', () => {
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

  describe('login', () => {
    it('MemberNotFoundException', async () => {
      // Given

      // When
      const result = authService.login('not-exists@kookmin.ac.kr', 'p4sSw0rd!');

      // Then
      await expect(result).rejects.toThrow(MemberNotFoundException);
    });

    it('MemberNotFoundException', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';
      const password = 'p4sSw0rd!';

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      memoryMemberRepository.push({
        ...createNullMember(),
        email,
        password: hashPassword,
      });

      // When
      const result = authService.login(email, `${password}!`);

      // Then
      await expect(result).rejects.toThrow(WrongPasswordException);
    });

    it('NotApprovedMemberException', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';
      const password = 'p4sSw0rd!';

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      memoryMemberRepository.push({
        ...createNullMember(),
        email,
        password: hashPassword,
        approved: false,
      });

      // When
      const result = authService.login(email, password);

      // Then
      await expect(result).rejects.toThrow(NotApprovedMemberException);
    });

    it('Passed', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';
      const password = 'p4sSw0rd!';

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      memoryMemberRepository.push({
        ...createNullMember(),
        email,
        password: hash,
        approved: true,
      });

      // When
      const result = authService.login(email, password);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('register', () => {
    it('InvalidVerifyTokenException', async () => {
      // Given

      // When
      const result = authService.register('', '', '', 'empty-token');

      // Then
      await expect(result).rejects.toThrow(InvalidVerifyTokenException);
    });

    it('AlreadyRegisteredByEmailException', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';
      const password = 'p4sSw0rd!';
      const verifyToken = 'verify-token';

      memoryMemberRepository.push({
        ...createNullMember(),
        email,
      });

      memoryRedisTokenRepository[verifyToken] = email;

      // When
      const result = authService.register('', '', password, verifyToken);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByEmailException);
    });

    it('AlreadyRegisteredByStudentIdException', async () => {
      // Given
      const studentId = '20240001';
      const email = 'honggildong@kookmin.ac.kr';
      const password = 'p4sSw0rd!';
      const verifyToken = 'verify-token';

      memoryMemberRepository.push({
        ...createNullMember(),
        studentId,
      });

      memoryRedisTokenRepository[verifyToken] = email;

      // When
      const result = authService.register('', studentId, password, verifyToken);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByStudentIdException);
    });

    it('Passed', async () => {
      // Given
      const name = '홍길동';
      const email = 'honggildong@kookmin.ac.kr';
      const password = 'p4sSw0rd!';
      const verifyToken = 'verify-token';

      memoryRedisTokenRepository[verifyToken] = email;

      // When
      const result = authService.register(name, '20240001', password, verifyToken);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository).toHaveLength(1);
      expect(memoryMemberRepository[0].email).toBe(email);
      expect(mailService.registerComplete).toHaveBeenCalledWith({ name });
    });
  });

  describe('sendCode', () => {
    it('AlreadyRegisteredByEmailException', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';

      memoryMemberRepository.push({
        ...createNullMember(),
        email,
      });

      // When
      const result = authService.sendCode(email);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByEmailException);
    });

    it('Passed', async () => {
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

  describe('verifyCode', () => {
    it('InvalidVerifyCodeException', async () => {
      // Given
      const email = 'honggildong@kookmin.ac.kr';
      const code = '123456';

      memoryRedisCodeRepository[email] = '654321';

      // When
      const result = authService.verifyCode(email, code);

      // Then
      await expect(result).rejects.toThrow(InvalidVerifyCodeException);
    });

    it('Passed', async () => {
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

  describe('myInfo', () => {
    it('Passed', async () => {
      // Given
      const member: Member = {
        _id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: uuid(),
        studentId: '20240001',
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
