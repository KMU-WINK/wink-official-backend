import { mockAuth } from './auth.mock';

import * as jwt from 'jsonwebtoken';

import { AuthController } from '../../src/domain/auth/controller';
import {
  RegisterRequestDto,
  SendCodeRequestDto,
  VerifyCodeRequestDto,
} from '../../src/domain/auth/dto';

import { Member } from '../../src/domain/member/schema';

describe('Auth Integrated Test', () => {
  let authController: AuthController;

  let memoryMemberRepository: Member[];
  let memoryRedisCodeRepository: Record<string, string>;
  let memoryRedisTokenRepository: Record<string, string>;

  beforeAll(async () => {
    const mock = await mockAuth();

    const { module } = mock;
    ({ memoryMemberRepository, memoryRedisCodeRepository, memoryRedisTokenRepository } = mock);

    authController = module.get<AuthController>(AuthController);
  });

  describe('Integrated Test', () => {
    const name = '홍길동';
    const studentId = 2024_0001;
    const email = 'honggildong@kookmin.ac.kr';
    const password = 'p4sSw0rd!';

    let verifyCode: string;
    let verifyToken: string;
    let token: string;

    it('인증코드 전송', async () => {
      // Given
      const request: SendCodeRequestDto = {
        email,
      };

      // When
      const result = authController.sendCode(request);

      // Then
      await expect(result).resolves.toBeUndefined();
      verifyCode = memoryRedisCodeRepository[email];

      // Then
      expect(verifyCode).toBeDefined();
    });

    it('인증 토큰 발급', async () => {
      // Given
      const request: VerifyCodeRequestDto = { email, code: verifyCode };

      // When
      const result = authController.verifyCode(request);

      // Then
      await expect(result).resolves.toBeDefined();
      verifyToken = (await result).verifyToken;

      // Then
      expect(verifyToken).toBeDefined();
      expect(memoryRedisCodeRepository[email]).toBeUndefined();
    });

    it('회원가입', async () => {
      // Given
      const request: RegisterRequestDto = { name, studentId, password, verifyToken };

      // When
      const result = authController.register(request);

      // Then
      await expect(result).resolves.toBeUndefined();

      // Then
      expect(memoryRedisTokenRepository[verifyToken]).toBeUndefined();
      expect(memoryMemberRepository).toHaveLength(1);
      expect(memoryMemberRepository[0].email).toBe(email);
    });

    it('로그인 (승인 X)', async () => {
      // Given
      const request = { email, password };

      // When
      const result = authController.login(request);

      // Then
      await expect(result).rejects.toThrow('이 계정은 승인된 계정이 아닙니다.');
    });

    it('로그인 (승인 O)', async () => {
      // Given
      const request = { email, password };

      // When
      const result = authController.login(request);
      memoryMemberRepository[0].approved = true;

      // Then
      await expect(result).resolves.toBeDefined();
      token = (await result).token;

      // Then
      expect(jwt.decode(token)['id']).toBe(memoryMemberRepository[0]._id);
    });
  });
});
