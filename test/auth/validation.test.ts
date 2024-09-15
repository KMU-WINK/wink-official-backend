import {
  LoginRequestDto,
  RefreshRequestDto,
  RegisterRequestDto,
  SendCodeRequestDto,
  VerifyCodeRequestDto,
} from '@wink/auth/dto';

import { Validation } from '@wink/validation';

describe('AuthValidation', () => {
  let validation: Validation;

  beforeAll(async () => {
    validation = new Validation();
  });

  describe('LoginRequestDto', () => {
    describe('email', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: LoginRequestDto = {
          // @ts-expect-error: 테스트 목적
          email: undefined,
          password: 'p4sSw0rd!',
        };

        // When
        const result = validation.validateBody(body, LoginRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: LoginRequestDto = {
          // @ts-expect-error: 테스트 목적
          email: 1234,
          password: 'p4sSw0rd!',
        };

        // When
        const result = validation.validateBody(body, LoginRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 문자열이어야 합니다.');
      });

      it('IsEmail', async () => {
        // Given
        const body: LoginRequestDto = {
          email: 'invalidEmail',
          password: 'p4sSw0rd!',
        };

        // When
        const result = validation.validateBody(body, LoginRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 이메일 형식이어야 합니다.');
      });
    });

    describe('password', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: LoginRequestDto = {
          email: 'test@kookmin.ac.kr',
          // @ts-expect-error: 테스트 목적
          password: undefined,
        };

        // When
        const result = validation.validateBody(body, LoginRequestDto);

        // Then
        await expect(result).rejects.toThrow('password은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: LoginRequestDto = {
          email: 'test@kookmin.ac.kr',
          // @ts-expect-error: 테스트 목적
          password: 1234,
        };

        // When
        const result = validation.validateBody(body, LoginRequestDto);

        // Then
        await expect(result).rejects.toThrow('password은(는) 문자열이어야 합니다.');
      });
    });

    it('Passed', async () => {
      // Given
      const body: LoginRequestDto = {
        email: 'honggildong@kookmin.ac.kr',
        password: 'p4sSw0rd!',
      };

      // When
      const result = validation.validateBody(body, LoginRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('RefreshRequestDto', () => {
    describe('refreshToken', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: RefreshRequestDto = {
          // @ts-expect-error: 테스트 목적
          refreshToken: undefined,
        };

        // When
        const result = validation.validateBody(body, RefreshRequestDto);

        // Then
        await expect(result).rejects.toThrow('refreshToken은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: RefreshRequestDto = {
          // @ts-expect-error: 테스트 목적
          refreshToken: 1234,
        };

        // When
        const result = validation.validateBody(body, RefreshRequestDto);

        // Then
        await expect(result).rejects.toThrow('refreshToken은(는) 문자열이어야 합니다.');
      });
    });

    it('Passed', async () => {
      // Given
      const body: RefreshRequestDto = {
        refreshToken: 'A.B.C',
      };

      // When
      const result = validation.validateBody(body, RefreshRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('RegisterRequestDto', () => {
    describe('name', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: RegisterRequestDto = {
          // @ts-expect-error: 테스트 목적
          name: undefined,
          studentId: '20240001',
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('name은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: RegisterRequestDto = {
          // @ts-expect-error: 테스트 목적
          name: 1234,
          studentId: '20240001',
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('name은(는) 문자열이어야 합니다.');
      });

      it('MinLength', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍',
          studentId: '20240001',
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('name은(는) 2자 이상이어야 합니다.');
      });

      it('MaxLength', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍홍홍홍홍길동',
          studentId: '20240001',
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('name은(는) 5자 이하여야 합니다.');
      });

      it('IsName', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: 'John',
          studentId: '20240001',
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('name은(는) 이름이어야 합니다.');
      });
    });

    describe('studentId', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          // @ts-expect-error: 테스트 목적
          studentId: undefined,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('studentId은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          // @ts-expect-error: 테스트 목적
          studentId: 1234,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('studentId은(는) 문자열이어야 합니다.');
      });

      it('IsNumberString', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: 'notNumber',
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('studentId은(는) 숫자 문자열이어야 합니다.');
      });

      it('Length', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: '2024000',
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('studentId은(는) 8자여야 합니다.');
      });

      it('IsStudentId', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: '12345678',
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('studentId은(는) 학번이어야 합니다.');
      });
    });

    describe('password', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: '20240001',
          // @ts-expect-error: 테스트 목적
          password: undefined,
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('password은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: '20240001',
          // @ts-expect-error: 테스트 목적
          password: 1234,
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('password은(는) 문자열이어야 합니다.');
      });

      it('MinLength', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: '20240001',
          password: 'aaaa',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('password은(는) 8자 이상이어야 합니다.');
      });

      it('IsPassword', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: '20240001',
          password: 'aaaaaaaa',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow(
          'password은(는) 비밀번호이어야 합니다. (영문, 숫자, 특수문자 포함)',
        );
      });
    });

    describe('verifyToken', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: '20240001',
          password: 'p4sSw0rd!',
          // @ts-expect-error: 테스트 목적
          verifyToken: undefined,
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('verifyToken은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsUUID', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: '20240001',
          password: 'p4sSw0rd!',
          verifyToken: 'aaaa-bbbb-cccc-dddd-eeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('verifyToken은(는) UUID 형식이어야 합니다.');
      });
    });

    it('Passed', async () => {
      // Given
      const body: RegisterRequestDto = {
        name: '홍길동',
        studentId: '20240001',
        password: 'p4sSw0rd!',
        verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
      };

      // When
      const result = validation.validateBody(body, RegisterRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('SendCodeRequestDto', () => {
    describe('email', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: SendCodeRequestDto = {
          // @ts-expect-error: 테스트 목적
          email: undefined,
        };

        // When
        const result = validation.validateBody(body, SendCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: SendCodeRequestDto = {
          // @ts-expect-error: 테스트 목적
          email: 1234,
        };

        // When
        const result = validation.validateBody(body, SendCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 문자열이어야 합니다.');
      });

      it('IsEmail', async () => {
        // Given
        const body: SendCodeRequestDto = {
          email: 'invalidEmail',
        };

        // When
        const result = validation.validateBody(body, SendCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 이메일 형식이어야 합니다.');
      });

      it('IsKookminEmail', async () => {
        // Given
        const body: SendCodeRequestDto = {
          email: 'honggildong@gmail.com',
        };

        // When
        const result = validation.validateBody(body, SendCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 국민대학교 이메일 형식이어야 합니다.');
      });
    });

    it('Passed', async () => {
      // Given
      const body: SendCodeRequestDto = {
        email: 'honggildong@kookmin.ac.kr',
      };

      // When
      const result = validation.validateBody(body, SendCodeRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('VerifyCodeRequestDto', () => {
    describe('email', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          // @ts-expect-error: 테스트 목적
          email: undefined,
          code: '123456',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          // @ts-expect-error: 테스트 목적
          email: 1234,
          code: '123456',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 문자열이어야 합니다.');
      });

      it('IsEmail', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: 'invalidEmail',
          code: '123456',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email은(는) 이메일 형식이어야 합니다.');
      });
    });

    describe('code', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: 'honggildong@kookmin.ac.kr',
          // @ts-expect-error: 테스트 목적
          code: undefined,
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow();
      });

      it('IsNumberString', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: 'honggildong@kookmin.ac.kr',
          code: 'abcdef',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('code은(는) 숫자 문자열이어야 합니다.');
      });

      it('Length', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: 'honggildong@kookmin.ac.kr',
          code: '12345',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('code은(는) 6자여야 합니다.');
      });
    });

    it('Passed', async () => {
      // Given
      const body: VerifyCodeRequestDto = {
        email: 'honggildong@oo.com',
        code: '123456',
      };

      // When
      const result = validation.validateBody(body, VerifyCodeRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });
});
