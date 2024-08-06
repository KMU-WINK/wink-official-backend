import { mockAuth } from './auth.mock';
import { createNullMember, createRandomMember } from '../member/fake-members.mock';

import * as bcrypt from 'bcrypt';

import { AuthService } from '../../src/domain/auth/service';
import {
  LoginRequestDto,
  RegisterRequestDto,
  SendCodeRequestDto,
  VerifyCodeRequestDto,
} from '../../src/domain/auth/dto';
import {
  AlreadyRegisteredByEmailException,
  AlreadyRegisteredByStudentIdException,
  InvalidVerifyCodeException,
  InvalidVerifyTokenException,
  MemberNotFoundException,
  WrongPasswordException,
} from '../../src/domain/auth/exception';

import { NotApprovedMemberException } from '../../src/domain/member/exception';

import { Member } from '../../src/domain/member/schema';

import { MailService } from '../../src/common/utils/mail';

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
    const EMAIL = 'honggildong@kookmin.ac.kr';
    const PASSWORD = 'p4sSw0rd!';

    const HASH = bcrypt.hashSync(PASSWORD, 10);
    const NULL_MEMBER: Member = {
      ...createNullMember(),
      email: EMAIL,
      password: HASH,
    };

    const PARAMS: LoginRequestDto = { email: EMAIL, password: PASSWORD };

    it('MemberNotFoundException', async () => {
      // Given

      // When
      const result = authService.login(PARAMS);

      // Then
      await expect(result).rejects.toThrow(MemberNotFoundException);
    });

    it('WrongPasswordException', async () => {
      // Given
      memoryMemberRepository.push(NULL_MEMBER);

      // When
      const result = authService.login({
        ...PARAMS,
        password: `${PASSWORD}!`,
      });

      // Then
      await expect(result).rejects.toThrow(WrongPasswordException);
    });

    it('NotApprovedMemberException', async () => {
      // Given
      memoryMemberRepository.push({
        ...NULL_MEMBER,
        approved: false,
      });

      // When
      const result = authService.login(PARAMS);

      // Then
      await expect(result).rejects.toThrow(NotApprovedMemberException);
    });

    it('Passed', async () => {
      // Given
      memoryMemberRepository.push({
        ...NULL_MEMBER,
        approved: true,
      });

      // When
      const result = authService.login(PARAMS);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('register', () => {
    const NAME = '홍길동';
    const STUDENT_ID = '20240001';
    const PASSWORD = 'p4sSw0rd!';
    const EMAIL = 'honggildong@kookmin.ac.kr';
    const VERIFY_TOKEN = 'verify-token';

    const HASH = bcrypt.hashSync(PASSWORD, 10);
    const NULL_MEMBER: Member = {
      ...createNullMember(),
      email: EMAIL,
      password: HASH,
      name: NAME,
      studentId: STUDENT_ID,
    };

    const PARAMS: RegisterRequestDto = {
      name: NAME,
      studentId: STUDENT_ID,
      password: PASSWORD,
      verifyToken: VERIFY_TOKEN,
    };

    it('InvalidVerifyTokenException', async () => {
      // Given

      // When
      const result = authService.register(PARAMS);

      // Then
      await expect(result).rejects.toThrow(InvalidVerifyTokenException);
    });

    it('AlreadyRegisteredByEmailException', async () => {
      // Given
      memoryMemberRepository.push({ ...NULL_MEMBER, studentId: '' });

      memoryRedisTokenRepository[VERIFY_TOKEN] = EMAIL;

      // When
      const result = authService.register(PARAMS);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByEmailException);
    });

    it('AlreadyRegisteredByStudentIdException', async () => {
      // Given
      memoryMemberRepository.push({ ...NULL_MEMBER, email: '' });

      memoryRedisTokenRepository[VERIFY_TOKEN] = EMAIL;

      // When
      const result = authService.register(PARAMS);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByStudentIdException);
    });

    it('Passed', async () => {
      // Given
      memoryRedisTokenRepository[VERIFY_TOKEN] = EMAIL;

      // When
      const result = authService.register(PARAMS);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository).toHaveLength(1);
      expect(memoryMemberRepository[0].email).toBe(EMAIL);
      expect(mailService.registerComplete).toHaveBeenCalledWith({ name: NAME });
    });
  });

  describe('sendCode', () => {
    const EMAIL = 'honggildong@kookmin.ac.kr';

    const NULL_MEMBER: Member = {
      ...createNullMember(),
      email: EMAIL,
    };

    const PARAMS: SendCodeRequestDto = { email: EMAIL };

    it('AlreadyRegisteredByEmailException', async () => {
      // Given
      memoryMemberRepository.push(NULL_MEMBER);

      // When
      const result = authService.sendCode(PARAMS);

      // Then
      await expect(result).rejects.toThrow(AlreadyRegisteredByEmailException);
    });

    it('Passed', async () => {
      // Given

      // When
      const result = authService.sendCode(PARAMS);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryRedisCodeRepository[EMAIL]).toBeDefined();
      expect(mailService.verifyCode).toHaveBeenCalledWith({
        email: EMAIL,
        code: memoryRedisCodeRepository[EMAIL],
      });
    });
  });

  describe('verifyCode', () => {
    const EMAIL = 'honggildong@kookmin.ac.kr';
    const CODE = '123456';

    const NULL_MEMBER: Member = {
      ...createNullMember(),
      email: EMAIL,
    };

    const PARAMS: VerifyCodeRequestDto = { email: EMAIL, code: CODE };

    it('InvalidVerifyCodeException', async () => {
      // Given
      memoryRedisCodeRepository[EMAIL] = CODE;

      // When
      const result = authService.verifyCode({
        ...PARAMS,
        code: `${CODE}1`,
      });

      // Then
      await expect(result).rejects.toThrow(InvalidVerifyCodeException);
    });

    it('Passed', async () => {
      // Given
      memoryRedisCodeRepository[EMAIL] = CODE;

      // When
      const result = authService.verifyCode(PARAMS);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('myInfo', () => {
    it('Passed', async () => {
      // Given
      const member: Member = createRandomMember();

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
