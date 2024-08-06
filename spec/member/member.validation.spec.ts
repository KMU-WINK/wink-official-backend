import { Validation } from '../../src/common/utils/validation';

import { Role } from '../../src/domain/member/constant';

import {
  ApproveWaitingMemberRequestDto,
  RejectWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
  UpdateMyInfoRequestDto,
  UpdateMyPasswordRequestDto,
} from '../../src/domain/member/dto';

describe('MemberValidation', () => {
  let validation: Validation;

  beforeAll(async () => {
    validation = new Validation();
  });

  describe('UpdateMyInfoRequestDto', () => {
    describe('description', () => {
      it('IsOptional', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          // @ts-expect-error: 테스트 목적
          description: undefined,
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).resolves.toBeDefined();
      });

      it('IsString', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          // @ts-expect-error: 테스트 목적
          description: 1234,
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('description은(는) 문자열이어야 합니다.');
      });

      it('MaxLength', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다. 반갑습니다. 만나서 반가워요. 잘 부탁드립니다.',
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('description은(는) 20자 이하여야 합니다.');
      });
    });

    describe('github', () => {
      it('IsOptional', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          // @ts-expect-error: 테스트 목적
          github: undefined,
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).resolves.toBeDefined();
      });

      it('IsString', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          // @ts-expect-error: 테스트 목적
          github: 1234,
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('github은(는) 문자열이어야 합니다.');
      });

      it('IsGithubUrl - Check url', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'honggildong',
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('github은(는) Github URL 형식이어야 합니다.');
      });

      it('IsGithubUrl - Check domain', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com.error/honggildong',
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('github은(는) Github URL 형식이어야 합니다.');
      });

      it('IsGithubUrl - Check username (1)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/hong_gildong',
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('github은(는) Github URL 형식이어야 합니다.');
      });

      it('IsGithubUrl - Check username (2)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github:
            'https://github.com/mygithubidishonggildongbutitsverylongbecauseitismorethan38characters',
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('github은(는) Github URL 형식이어야 합니다.');
      });
    });

    describe('instagram', () => {
      it('IsOptional', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          // @ts-expect-error: 테스트 목적
          instagram: undefined,
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).resolves.toBeDefined();
      });

      it('IsString', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          // @ts-expect-error: 테스트 목적
          instagram: 1234,
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram은(는) 문자열이어야 합니다.');
      });

      it('IsInstagramUrl - Check url', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram: 'honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram은(는) Instagram URL 형식이어야 합니다.');
      });

      it('IsInstagramUrl - Check domain', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com.error/honggildong.',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram은(는) Instagram URL 형식이어야 합니다.');
      });

      it('IsInstagramUrl - Check username (1)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com.fake/hong..gildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram은(는) Instagram URL 형식이어야 합니다.');
      });

      it('IsInstagramUrl - Check username (2)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram:
            'https://instagram.com.fake/thisisverylonginstagramidbecauseitismorethan30characters',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram은(는) Instagram URL 형식이어야 합니다.');
      });
    });

    describe('blog', () => {
      it('IsOptional', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com/honggildong',
          // @ts-expect-error: 테스트 목적
          blog: undefined,
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).resolves.toBeDefined();
      });

      it('IsString', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com/honggildong',
          // @ts-expect-error: 테스트 목적
          blog: 1234,
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('blog은(는) 문자열이어야 합니다.');
      });

      it('IsUrl', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com/honggildong',
          blog: 'itsnoturl',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('blog은(는) URL 형식이어야 합니다.');
      });
    });

    it('Passed', async () => {
      // Given
      const body: UpdateMyInfoRequestDto = {
        description: '안녕하세요. 홍길동입니다.',
        github: 'https://github.com/honggildong',
        instagram: 'https://instagram.com/honggildong',
        blog: 'https://honggildong.tistory.com',
      };

      // When
      const result = validation.validateBody(body, UpdateMyInfoRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('UpdateMyPasswordRequestDto', () => {
    describe('password', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          // @ts-expect-error: 테스트 목적
          password: undefined,
          newPassword: 'newpassword',
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow('password은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          // @ts-expect-error: 테스트 목적
          password: 1234,
          newPassword: 'newpassword',
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow('password은(는) 문자열이어야 합니다.');
      });
    });

    describe('newPassword', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          password: 'p4ssw0rd!',
          // @ts-expect-error: 테스트 목적
          newPassword: undefined,
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow('newPassword은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          password: 'p4ssw0rd!',
          // @ts-expect-error: 테스트 목적
          newPassword: 1234,
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow('newPassword은(는) 문자열이어야 합니다.');
      });

      it('MinLength', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          password: 'p4ssw0rd!',
          newPassword: 'aaaa',
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow('newPassword은(는) 8자 이상이어야 합니다.');
      });

      it('IsPassword', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          password: 'p4ssw0rd!',
          newPassword: 'aaaaaaaa',
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow(
          'newPassword은(는) 비밀번호이어야 합니다. (영문, 숫자, 특수문자 포함)',
        );
      });
    });

    it('Passed', async () => {
      // Given
      const body: UpdateMyPasswordRequestDto = {
        password: 'p4ssw0rd!',
        newPassword: 'n3wp4ssw0rd!',
      };

      // When
      const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('ApproveWaitingMemberRequestDto', () => {
    describe('memberId', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: ApproveWaitingMemberRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
        };

        // When
        const result = validation.validateBody(body, ApproveWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: ApproveWaitingMemberRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: 1234,
        };

        // When
        const result = validation.validateBody(body, ApproveWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) 문자열이어야 합니다.');
      });

      it('IsMongoId', async () => {
        // Given
        const body: ApproveWaitingMemberRequestDto = {
          memberId: 'notvalidmemberid',
        };

        // When
        const result = validation.validateBody(body, ApproveWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) MongoDB ID 형식이어야 합니다.');
      });
    });

    it('Passed', async () => {
      // Given
      const body: ApproveWaitingMemberRequestDto = {
        memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
      };

      // When
      const result = validation.validateBody(body, ApproveWaitingMemberRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('RejectWaitingMemberRequestDto', () => {
    describe('memberId', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: RejectWaitingMemberRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
        };

        // When
        const result = validation.validateBody(body, RejectWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsString', async () => {
        // Given
        const body: RejectWaitingMemberRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: 1234,
        };

        // When
        const result = validation.validateBody(body, RejectWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) 문자열이어야 합니다.');
      });

      it('IsMongoId', async () => {
        // Given
        const body: RejectWaitingMemberRequestDto = {
          memberId: 'notvalidmemberid',
        };

        // When
        const result = validation.validateBody(body, RejectWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) MongoDB ID 형식이어야 합니다.');
      });
    });

    it('Passed', async () => {
      // Given
      const body: RejectWaitingMemberRequestDto = {
        memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
      };

      // When
      const result = validation.validateBody(body, RejectWaitingMemberRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('UpdateMemberRoleRequestDto', () => {
    describe('memberId', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: UpdateMemberRoleRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
          role: Role.MEMBER,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) 빈 값이어서는 안됩니다');
      });

      it('IsString', async () => {
        // Given
        const body: UpdateMemberRoleRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
          role: Role.MEMBER,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsMongoId', async () => {
        // Given
        const body: UpdateMemberRoleRequestDto = {
          memberId: 'notvalidmemberid',
          role: Role.MEMBER,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) MongoDB ID 형식이어야 합니다.');
      });
    });

    describe('role', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: UpdateMemberRoleRequestDto = {
          memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
          // @ts-expect-error: 테스트 목적
          role: undefined,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow('role은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsEnum', async () => {
        // Given
        const body: UpdateMemberFeeRequestDto = {
          memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
          // @ts-expect-error: 테스트 목적
          role: 'notvalidrole',
        };

        // When
        // @ts-expect-error: 테스트 목적
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow(
          `role은(는) PRESIDENT, VICE_PRESIDENT, EXECUTIVE, MEMBER 중 하나여야 합니다.`,
        );
      });
    });

    it('Passed', async () => {
      // Given
      const body: UpdateMemberRoleRequestDto = {
        memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
        role: Role.MEMBER,
      };

      // When
      const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('UpdateMemberFeeRequestDto', () => {
    describe('memberId', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: UpdateMemberFeeRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
          fee: false,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberFeeRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) 빈 값이어서는 안됩니다');
      });

      it('IsString', async () => {
        // Given
        const body: UpdateMemberFeeRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
          fee: false,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberFeeRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsMongoId', async () => {
        // Given
        const body: UpdateMemberFeeRequestDto = {
          memberId: 'notvalidmemberid',
          fee: false,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberFeeRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId은(는) MongoDB ID 형식이어야 합니다.');
      });
    });

    describe('fee', () => {
      it('IsNotEmpty', async () => {
        // Given
        const body: UpdateMemberFeeRequestDto = {
          memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
          // @ts-expect-error: 테스트 목적
          fee: undefined,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberFeeRequestDto);

        // Then
        await expect(result).rejects.toThrow('fee은(는) 빈 값이어서는 안됩니다.');
      });

      it('IsBoolean', async () => {
        // Given
        const body: UpdateMemberFeeRequestDto = {
          memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
          // @ts-expect-error: 테스트 목적
          fee: 1234,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberFeeRequestDto);

        // Then
        await expect(result).rejects.toThrow('fee은(는) 불 대수이어야 합니다.');
      });
    });

    it('Passed', async () => {
      // Given
      const body: UpdateMemberFeeRequestDto = {
        memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
        fee: true,
      };

      // When
      const result = validation.validateBody(body, UpdateMemberFeeRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });
});
