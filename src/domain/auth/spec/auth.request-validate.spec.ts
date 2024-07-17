import { Validator } from '../../../utils/validator/Validator';

import { LoginRequest } from '../dto/request/LoginRequest';
import { RegisterRequest } from '../dto/request/RegisterRequest';
import { SendCodeRequest } from '../dto/request/SendCodeRequest';
import { VerifyCodeRequest } from '../dto/request/VerifyCodeRequest';

describe('Auth Request DTO 검증 테스트', () => {
  let validator: Validator;

  beforeAll(async () => {
    validator = new Validator();
  });

  describe('로그인', () => {
    describe('이메일', () => {
      it('이메일이 주어지지 않았을 때', async () => {
        // Given
        const body: LoginRequest = {
          email: null,
          password: 'p4sSw0rd!',
        };

        // When
        const result = validator.validateBody(body, LoginRequest);

        // Then
        await expect(result).rejects.toThrow('이메일 형식이 올바르지 않습니다.');
      });

      it('이메일 형식이 올바르지 않을 때', async () => {
        // Given
        const body: LoginRequest = {
          email: 'invalidEmail',
          password: 'p4sSw0rd!',
        };

        // When
        const result = validator.validateBody(body, LoginRequest);

        // Then
        await expect(result).rejects.toThrow('이메일 형식이 올바르지 않습니다.');
      });
    });

    describe('비밀번호', () => {
      it('비밀번호가 주어지지 않았을 때', async () => {
        // Given
        const body: LoginRequest = {
          email: 'test@gmail.com',
          password: null,
        };

        // When
        const result = validator.validateBody(body, LoginRequest);

        // Then
        await expect(result).rejects.toThrow('비밀번호는 필수 입력 값입니다.');
      });

      it('비밀번호가 빈 문자열일 때', async () => {
        // Given
        const body: LoginRequest = {
          email: 'honggildong@gmail.com',
          password: '',
        };

        // When
        const result = validator.validateBody(body, LoginRequest);

        // Then
        await expect(result).rejects.toThrow('비밀번호는 필수 입력 값입니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
      // Given
      const body: LoginRequest = {
        email: 'honggildong@gmail.com',
        password: 'p4sSw0rd!',
      };

      // When
      const result = validator.validateBody(body, LoginRequest);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('회원가입', () => {
    describe('이름', () => {
      it('이름이 주어지지 않았을 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: null,
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow('이름은 2글자 이상 10글자 이하로 입력해주세요.');
      });

      it('이름이 짧을 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍',
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow('이름은 2글자 이상 10글자 이하로 입력해주세요.');
      });

      it('이름이 길 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동홍길동홍길동홍길동',
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow('이름은 2글자 이상 10글자 이하로 입력해주세요.');
      });
    });

    describe('학번', () => {
      it('학번이 주어지지 않았을 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: null,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow('올바른 학번이 아닙니다.');
      });

      it('학번이 짧을 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow('올바른 학번이 아닙니다.');
      });

      it('학번이 길 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_0000_1,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow('올바른 학번이 아닙니다.');
      });
    });

    describe('비밀번호', () => {
      it('비밀번호가 주어지지 않았을 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_0001,
          password: null,
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow(
          '비밀번호는 8글자 이상 24글자 이하의 영어 대소문자와 숫자로 입력해주세요.',
        );
      });

      it('비밀번호가 빈 문자열일 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_0001,
          password: '',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow(
          '비밀번호는 8글자 이상 24글자 이하의 영어 대소문자와 숫자로 입력해주세요.',
        );
      });

      it('비밀번호가 짧을 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'aaaa',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow(
          '비밀번호는 8글자 이상 24글자 이하의 영어 대소문자와 숫자로 입력해주세요.',
        );
      });

      it('비밀번호가 길 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'aaaaaaaaaaaaaaaaaaaaaaaaz',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow(
          '비밀번호는 8글자 이상 24글자 이하의 영어 대소문자와 숫자로 입력해주세요.',
        );
      });

      it('비밀번호가 영어만 있을 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'aaaaaaaa',
          verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow(
          '비밀번호는 8글자 이상 24글자 이하의 영어 대소문자와 숫자로 입력해주세요.',
        );
      });
    });

    describe('인증 토큰', () => {
      it('인증 토큰이 주어지지 않았을 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: null,
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow('올바른 인증 토큰이 아닙니다.');
      });

      it('인증 토큰이 빈 문자열일 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: '',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow('올바른 인증 토큰이 아닙니다.');
      });

      it('인증 토큰이 UUID v4 형태가 아닐 때', async () => {
        // Given
        const body: RegisterRequest = {
          name: '홍길동',
          studentId: 2024_0001,
          password: 'p4sSw0rd!',
          verifyToken: 'aaaa-bbbb-cccc-dddd-eeee',
        };

        // When
        const result = validator.validateBody(body, RegisterRequest);

        // Then
        await expect(result).rejects.toThrow('올바른 인증 토큰이 아닙니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
      // Given
      const body: RegisterRequest = {
        name: '홍길동',
        studentId: 2024_0001,
        password: 'p4sSw0rd!',
        verifyToken: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
      };

      // When
      const result = validator.validateBody(body, RegisterRequest);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('인증코드 전송', () => {
    describe('이메일', () => {
      it('이메일이 주어지지 않았을 때', async () => {
        // Given
        const body: SendCodeRequest = {
          email: null,
        };

        // When
        const result = validator.validateBody(body, SendCodeRequest);

        // Then
        await expect(result).rejects.toThrow('이메일 형식이 올바르지 않습니다.');
      });

      it('이메일 형식이 올바르지 않을 때', async () => {
        // Given
        const body: SendCodeRequest = {
          email: 'invalidEmail',
        };

        // When
        const result = validator.validateBody(body, SendCodeRequest);

        // Then
        await expect(result).rejects.toThrow('이메일 형식이 올바르지 않습니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
      // Given
      const body: SendCodeRequest = {
        email: 'honggildong@gmail.com',
      };

      // When
      const result = validator.validateBody(body, SendCodeRequest);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('인증 토큰 발급', () => {
    describe('이메일', () => {
      it('이메일이 주어지지 않았을 때', async () => {
        // Given
        const body: VerifyCodeRequest = {
          email: null,
          code: '123456',
        };

        // When
        const result = validator.validateBody(body, VerifyCodeRequest);

        // Then
        await expect(result).rejects.toThrow('이메일 형식이 올바르지 않습니다.');
      });

      it('이메일 형식이 올바르지 않을 때', async () => {
        // Given
        const body: VerifyCodeRequest = {
          email: 'invalidEmail',
          code: '123456',
        };

        // When
        const result = validator.validateBody(body, VerifyCodeRequest);

        // Then
        await expect(result).rejects.toThrow('이메일 형식이 올바르지 않습니다.');
      });
    });

    describe('인증코드', () => {
      it('인증코드가 주어지지 않았을 때', async () => {
        // Given
        const body: VerifyCodeRequest = {
          email: 'honggildong@gmail.com',
          code: null,
        };

        // When
        const result = validator.validateBody(body, VerifyCodeRequest);

        // Then
        await expect(result).rejects.toThrow();
      });

      it('인증코드에 문자가 들어갔을 때', async () => {
        // Given
        const body: VerifyCodeRequest = {
          email: 'honggildong@gmail.com',
          code: 'abcdef',
        };

        // When
        const result = validator.validateBody(body, VerifyCodeRequest);

        // Then
        await expect(result).rejects.toThrow('올바른 인증코드가 아닙니다.');
      });

      it('인증코드가 짧을 때', async () => {
        // Given
        const body: VerifyCodeRequest = {
          email: 'honggildong@gmail.com',
          code: '12345',
        };

        // When
        const result = validator.validateBody(body, VerifyCodeRequest);

        // Then
        await expect(result).rejects.toThrow('인증코드는 6자리 숫자로 입력해주세요.');
      });

      it('인증코드가 길 때', async () => {
        // Given
        const body: VerifyCodeRequest = {
          email: 'honggildong@gmail.com',
          code: '1234567',
        };

        // When
        const result = validator.validateBody(body, VerifyCodeRequest);

        // Then
        await expect(result).rejects.toThrow('인증코드는 6자리 숫자로 입력해주세요.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
      // Given
      const body: VerifyCodeRequest = {
        email: 'honggildong@gmail.com',
        code: '123456',
      };

      // When
      const result = validator.validateBody(body, VerifyCodeRequest);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });
});
