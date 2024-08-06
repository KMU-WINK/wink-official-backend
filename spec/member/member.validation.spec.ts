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

describe('Member Validation Test', () => {
  let validation: Validation;

  beforeAll(async () => {
    validation = new Validation();
  });

  describe('내 정보 수정', () => {
    describe('한 줄 소개', () => {
      it('한 줄 소개가 주어지지 않았을 때', async () => {
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

      it('한 줄 소개가 길 때', async () => {
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
        await expect(result).rejects.toThrow('description는 20자 이하로 입력해주세요.');
      });
    });

    describe('Github URL', () => {
      it('Github ID가 주어지지 않았을 때', async () => {
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

      it('Github ID가 잘못 입력되었을 때 (1)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong-',
          instagram: 'https://instagram.com/honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('github는 Github URL 형식이어야 합니다.');
      });

      it('Github ID가 잘못 입력되었을 때 (2)', async () => {
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
        await expect(result).rejects.toThrow('github는 Github URL 형식이어야 합니다.');
      });

      it('Github ID가 잘못 입력되었을 때 (3)', async () => {
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
        await expect(result).rejects.toThrow('github는 Github URL 형식이어야 합니다.');
      });
    });

    describe('Instagram URL', () => {
      it('Instagram ID가 주어지지 않았을 때', async () => {
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

      it('Instagram ID가 잘못 입력되었을 때 (1)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com/hong..gildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram는 Instagram URL 형식이어야 합니다.');
      });

      it('Instagram ID가 잘못 입력되었을 때 (2)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram: 'https://instagram.com/honggildong.',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram는 Instagram URL 형식이어야 합니다.');
      });

      it('Instagram ID가 잘못 입력되었을 때 (3)', async () => {
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
        await expect(result).rejects.toThrow('instagram는 Instagram URL 형식이어야 합니다.');
      });

      it('Instagram ID가 잘못 입력되었을 때 (4)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'https://github.com/honggildong',
          instagram: '.honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram는 Instagram URL 형식이어야 합니다.');
      });
    });

    describe('Blog URL', () => {
      it('Blog URL이 주어지지 않았을 때', async () => {
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

      it('Blog URL이 URL 형식이 아닐 때', async () => {
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
        await expect(result).rejects.toThrow('blog는 URL 형식이 아닙니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
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

  describe('내 비밀번호 수정', () => {
    describe('기존 비밀번호', () => {
      it('기존 비밀번호가 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          // @ts-expect-error: 테스트 목적
          password: undefined,
          newPassword: 'newpassword',
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow('password는 필수 입력 값입니다.');
      });
    });

    describe('새 비밀번호', () => {
      it('새 비밀번호가 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          password: 'password',
          // @ts-expect-error: 테스트 목적
          newPassword: undefined,
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow('newPassword는 필수 입력 값입니다.');
      });

      it('비밀번호가 짧을 때', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          password: 'p4ssw0rd!',
          newPassword: 'aaaa',
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow('newPassword는 8자 이상으로 입력해주세요.');
      });

      it('비밀번호가 길 때', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          password: 'p4ssw0rd!',
          newPassword: 'aaaaaaaaaaaaaaaaaaaaaaaaz',
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow('newPassword는 24자 이하로 입력해주세요.');
      });

      it('비밀번호가 영어만 있을 때', async () => {
        // Given
        const body: UpdateMyPasswordRequestDto = {
          password: 'p4ssw0rd!',
          newPassword: 'aaaaaaaa',
        };

        // When
        const result = validation.validateBody(body, UpdateMyPasswordRequestDto);

        // Then
        await expect(result).rejects.toThrow(
          'newPassword는 비밀번호 형식이 아닙니다. (영문, 숫자, 특수문자 포함 8~24자)',
        );
      });
    });

    it('모든 입력이 유효할 때', async () => {
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

  describe('회원가입 승인 대기 승인', () => {
    describe('멤버 ID', () => {
      it('멤버 ID가 주어지지 않았을 때', async () => {
        // Given
        const body: ApproveWaitingMemberRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
        };

        // When
        const result = validation.validateBody(body, ApproveWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 필수 입력 값입니다.');
      });

      it('올바른 멤버 ID가 아닐 때', async () => {
        // Given
        const body: ApproveWaitingMemberRequestDto = {
          memberId: 'notvalidmemberid',
        };

        // When
        const result = validation.validateBody(body, ApproveWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 올바른 Object ID 형식이 아닙니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
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

  describe('회원가입 승인 대기 거부', () => {
    describe('멤버 ID', () => {
      it('멤버 ID가 주어지지 않았을 때', async () => {
        // Given
        const body: RejectWaitingMemberRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
        };

        // When
        const result = validation.validateBody(body, RejectWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 필수 입력 값입니다.');
      });

      it('올바른 멤버 ID가 아닐 때', async () => {
        // Given
        const body: RejectWaitingMemberRequestDto = {
          memberId: 'notvalidmemberid',
        };

        // When
        const result = validation.validateBody(body, RejectWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 올바른 Object ID 형식이 아닙니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
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

  describe('멤버 역할 변경', () => {
    describe('멤버 ID', () => {
      it('멤버 ID가 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMemberRoleRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
          role: Role.MEMBER,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 필수 입력 값입니다.');
      });

      it('올바른 멤버 ID가 아닐 때', async () => {
        // Given
        const body: UpdateMemberRoleRequestDto = {
          memberId: 'notvalidmemberid',
          role: Role.MEMBER,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 올바른 Object ID 형식이 아닙니다.');
      });
    });

    describe('역할', () => {
      it('역할이 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMemberRoleRequestDto = {
          memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
          // @ts-expect-error: 테스트 목적
          role: undefined,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow('role는 필수 입력 값입니다.');
      });

      it('올바른 역할이 아닐 때', async () => {
        // Given
        const body: Record<string, unknown> = {
          memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
          role: 'notvalidrole',
        };

        // When
        // @ts-expect-error: 테스트 목적
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow(
          `role는 올바른 값이 아닙니다. (${Object.values(Role).join(', ')})`,
        );
      });
    });

    it('모든 입력이 유효할 때', async () => {
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

  describe('멤버 회비 납부 변경', () => {
    describe('멤버 ID', () => {
      it('멤버 ID가 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMemberFeeRequestDto = {
          // @ts-expect-error: 테스트 목적
          memberId: undefined,
          fee: false,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberFeeRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 필수 입력 값입니다.');
      });

      it('올바른 멤버 ID가 아닐 때', async () => {
        // Given
        const body: UpdateMemberFeeRequestDto = {
          memberId: 'notvalidmemberid',
          fee: false,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberFeeRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 올바른 Object ID 형식이 아닙니다.');
      });
    });

    describe('회비 납부 여부', () => {
      it('회비 납부 여부 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMemberFeeRequestDto = {
          memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
          // @ts-expect-error: 테스트 목적
          fee: undefined,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberFeeRequestDto);

        // Then
        await expect(result).rejects.toThrow('fee는 필수 입력 값입니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
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
