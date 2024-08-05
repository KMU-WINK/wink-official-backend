import { Validation } from '../../src/common/utils/validation';

import {
  LoginRequestDto,
  RegisterRequestDto,
  SendCodeRequestDto,
  VerifyCodeRequestDto,
} from '../../src/domain/auth/dto';

describe('Auth Validation Test', () => {
  let validation: Validation;

  beforeAll(async () => {
    validation = new Validation();
  });

  describe('로그인', () => {
    describe('이메일', () => {
      it('이메일이 주어지지 않았을 때', async () => {
        // Given
        const body: LoginRequestDto = {
          email: undefined,
          password: 'p4sSw0rd!',
        };

        // When
        const result = validation.validateBody(body, LoginRequestDto);

        // Then
        await expect(result).rejects.toThrow('email는 필수 입력 값입니다.');
      });

      it('이메일 형식이 올바르지 않을 때', async () => {
        // Given
        const body: LoginRequestDto = {
          email: 'invalidEmail',
          password: 'p4sSw0rd!',
        };

        // When
        const result = validation.validateBody(body, LoginRequestDto);

        // Then
        await expect(result).rejects.toThrow('email는 이메일 형식이 아닙니다.');
      });
    });

    describe('비밀번호', () => {
      it('비밀번호가 주어지지 않았을 때', async () => {
        // Given
        const body: LoginRequestDto = {
          email: 'test@kookmin.ac.kr',
          password: null,
        };

        // When
        const result = validation.validateBody(body, LoginRequestDto);

        // Then
        await expect(result).rejects.toThrow('password는 필수 입력 값입니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
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

  describe('회원가입', () => {
    describe('이름', () => {
      it('이름이 주어지지 않았을 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: null,
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('name는 필수 입력 값입니다.');
      });

      it('이름이 짧을 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍',
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('name는 2자 이상으로 입력해주세요.');
      });

      it('이름이 길 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동홍길동홍길동홍길동',
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('name는 5자 이하로 입력해주세요.');
      });
    });

    describe('학번', () => {
      it('학번이 주어지지 않았을 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: null,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('studentId는 숫자가 아닙니다.');
      });

      it('학번이 짧을 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: 2024_001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow(
          'studentId는 학번 형식이 아닙니다. (20000001 ~ 21009999)',
        );
      });

      it('학번이 길 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: 2024_0000_1,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow(
          'studentId는 학번 형식이 아닙니다. (20000001 ~ 21009999)',
        );
      });
    });

    describe('비밀번호', () => {
      it('비밀번호가 주어지지 않았을 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: 2024_0001,
          password: null,
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('password는 필수 입력 값입니다.');
      });

      it('비밀번호가 짧을 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'aaaa',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('password는 8자 이상으로 입력해주세요.');
      });

      it('비밀번호가 길 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'aaaaaaaaaaaaaaaaaaaaaaaaz',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('password는 24자 이하로 입력해주세요.');
      });

      it('비밀번호가 영어만 있을 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'aaaaaaaa',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow(
          'password는 비밀번호 형식이 아닙니다. (영문, 숫자, 특수문자 포함 8~24자)',
        );
      });
    });

    describe('인증 토큰', () => {
      it('인증 토큰이 주어지지 않았을 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: null,
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('verifyToken는 필수 입력 값입니다.');
      });

      it('인증 토큰이 UUID 형태가 아닐 때', async () => {
        // Given
        const body: RegisterRequestDto = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaa-bbbb-cccc-dddd-eeee',
        };

        // When
        const result = validation.validateBody(body, RegisterRequestDto);

        // Then
        await expect(result).rejects.toThrow('verifyToken는 UUID 형식이 아닙니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
      // Given
      const body: RegisterRequestDto = {
        name: '홍길동',
        studentId: 2024_0001,
        password: 'p4sSw0rd!',
        verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
      };

      // When
      const result = validation.validateBody(body, RegisterRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('인증코드 전송', () => {
    describe('이메일', () => {
      it('이메일이 주어지지 않았을 때', async () => {
        // Given
        const body: SendCodeRequestDto = {
          email: null,
        };

        // When
        const result = validation.validateBody(body, SendCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email는 필수 입력 값입니다.');
      });

      it('이메일 형식이 올바르지 않을 때', async () => {
        // Given
        const body: SendCodeRequestDto = {
          email: 'invalidEmail',
        };

        // When
        const result = validation.validateBody(body, SendCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email는 이메일 형식이 아닙니다.');
      });

      it('이메일 형식 국민대학교 메일이 아닐 때', async () => {
        // Given
        const body: SendCodeRequestDto = {
          email: 'honggildong@kookmin.ac.kr',
        };

        // When
        const result = validation.validateBody(body, SendCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email는 국민대학교 이메일 형식이 아닙니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
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

  describe('인증 토큰 발급', () => {
    describe('이메일', () => {
      it('이메일이 주어지지 않았을 때', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: null,
          code: '123456',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email는 필수 입력 값입니다.');
      });

      it('이메일 형식이 올바르지 않을 때', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: 'invalidEmail',
          code: '123456',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('email는 이메일 형식이 아닙니다.');
      });
    });

    describe('인증코드', () => {
      it('인증코드가 주어지지 않았을 때', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: 'honggildong@kookmin.ac.kr',
          code: null,
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow();
      });

      it('인증코드에 문자가 들어갔을 때', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: 'honggildong@kookmin.ac.kr',
          code: 'abcdef',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('code는 숫자 문자열이 아닙니다.');
      });

      it('인증코드가 짧을 때', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: 'honggildong@kookmin.ac.kr',
          code: '12345',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('code는 6자로 입력해주세요.');
      });

      it('인증코드가 길 때', async () => {
        // Given
        const body: VerifyCodeRequestDto = {
          email: 'honggildong@kookmin.ac.kr',
          code: '1234567',
        };

        // When
        const result = validation.validateBody(body, VerifyCodeRequestDto);

        // Then
        await expect(result).rejects.toThrow('code는 6자로 입력해주세요.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
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
