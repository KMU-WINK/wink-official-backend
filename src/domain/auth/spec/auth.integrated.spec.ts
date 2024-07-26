import { mockAuth } from './mock/auth.mock';

import { AuthController } from '../auth.controller';

import * as jwt from 'jsonwebtoken';

import { Member } from '../../member/member.schema';

import { SendCodeRequest } from '../dto/request/SendCodeRequest';
import { VerifyCodeRequest } from '../dto/request/VerifyCodeRequest';
import { RegisterRequest } from '../dto/request/RegisterRequest';

describe('Auth Integrated Test', () => {
  let authController: AuthController;

  let memoryMemberRepository: Member[];
  let memoryRedisRepository: Record<string, string>;

  beforeAll(async () => {
    const {
      module,
      memoryMemberRepository: memoryMemberRepository1,
      memoryRedisRepository: memoryRedisRepository1,
    } = await mockAuth();

    authController = module.get<AuthController>(AuthController);

    memoryMemberRepository = memoryMemberRepository1;
    memoryRedisRepository = memoryRedisRepository1;
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
      await authController.sendCode(request);

      // Then
      expect(memoryRedisRepository[email]).toBeDefined();
    });

    it('인증 토큰 발급', async () => {
      // Given
      const request: VerifyCodeRequest = { email, code: memoryRedisRepository[email] };

      // When
      const response = await authController.verifyCode(request);
      verifyToken = response.verifyToken;

      // Then
      expect(memoryRedisRepository[email]).toBeUndefined();
      expect(memoryRedisRepository[verifyToken]).toBe(email);
    });

    it('회원가입', async () => {
      // Given
      const request: RegisterRequest = { name, studentId, password, verifyToken };

      // When
      await authController.register(request);

      // Then
      expect(memoryRedisRepository[email]).toBeUndefined();
    });

    it('로그인', async () => {
      // Given
      const request = { email, password };

      // When
      const response = await authController.login(request);
      token = response.token;

      // Then
      const member = memoryMemberRepository.find((member) => member.email === email);
      expect(jwt.decode(token)['id']).toBe(member['_id']);
    });
  });
});
