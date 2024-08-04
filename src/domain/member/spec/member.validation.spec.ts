import { Validation } from '../../../utils';
import {
  ApproveWaitingMemberRequestDto,
  RefuseWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
  UpdateMyInfoRequestDto,
  UpdateMyPasswordRequestDto,
} from '../dto';

import { Role } from '../constant/Role';

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
          description: undefined,
          github: 'honggildong',
          instagram: 'honggildong',
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
          github: 'honggildong',
          instagram: 'honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('description는 20자 이하로 입력해주세요.');
      });
    });

    describe('Github 아이디', () => {
      it('Github ID가 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: undefined,
          instagram: 'honggildong',
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
          github: 'honggildong-',
          instagram: 'honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('github는 Github 아이디 형식이 아닙니다.');
      });

      it('Github ID가 잘못 입력되었을 때 (2)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'hong@gildong',
          instagram: 'honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('github는 Github 아이디 형식이 아닙니다.');
      });

      it('Github ID가 잘못 입력되었을 때 (3)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'mygithubidishonggildongbutitsverylongbecauseitismorethan38characters',
          instagram: 'honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('github는 Github 아이디 형식이 아닙니다.');
      });
    });

    describe('Instagram 아아디', () => {
      it('Instagram ID가 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'honggildong',
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
          github: 'honggildong',
          instagram: 'hong..gildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram는 Instagram 아이디 형식이 아닙니다.');
      });

      it('Instagram ID가 잘못 입력되었을 때 (2)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'honggildong',
          instagram: 'honggildong.',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram는 Instagram 아이디 형식이 아닙니다.');
      });

      it('Instagram ID가 잘못 입력되었을 때 (3)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'honggildong',
          instagram: 'thisisverylonginstagramidbecauseitismorethan30characters',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram는 Instagram 아이디 형식이 아닙니다.');
      });

      it('Instagram ID가 잘못 입력되었을 때 (4)', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'honggildong',
          instagram: '.honggildong',
          blog: 'https://honggildong.tistory.com',
        };

        // When
        const result = validation.validateBody(body, UpdateMyInfoRequestDto);

        // Then
        await expect(result).rejects.toThrow('instagram는 Instagram 아이디 형식이 아닙니다.');
      });
    });

    describe('Blog URL', () => {
      it('Blog URL이 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMyInfoRequestDto = {
          description: '안녕하세요. 홍길동입니다.',
          github: 'honggildong',
          instagram: 'honggildong',
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
          github: 'honggildong',
          instagram: 'honggildong',
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
        github: 'honggildong',
        instagram: 'honggildong',
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
        const body: RefuseWaitingMemberRequestDto = {
          memberId: undefined,
        };

        // When
        const result = validation.validateBody(body, RefuseWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 필수 입력 값입니다.');
      });

      it('올바른 멤버 ID가 아닐 때', async () => {
        // Given
        const body: RefuseWaitingMemberRequestDto = {
          memberId: 'notvalidmemberid',
        };

        // When
        const result = validation.validateBody(body, RefuseWaitingMemberRequestDto);

        // Then
        await expect(result).rejects.toThrow('memberId는 올바른 Object ID 형식이 아닙니다.');
      });
    });

    it('모든 입력이 유효할 때', async () => {
      // Given
      const body: RefuseWaitingMemberRequestDto = {
        memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
      };

      // When
      const result = validation.validateBody(body, RefuseWaitingMemberRequestDto);

      // Then
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('멤버 역할 변경', () => {
    describe('멤버 ID', () => {
      it('멤버 ID가 주어지지 않았을 때', async () => {
        // Given
        const body: UpdateMemberRoleRequestDto = {
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
          role: undefined,
        };

        // When
        const result = validation.validateBody(body, UpdateMemberRoleRequestDto);

        // Then
        await expect(result).rejects.toThrow('role는 필수 입력 값입니다.');
      });

      it('올바른 역할이 아닐 때', async () => {
        // Given
        const body: Record<string, any> = {
          memberId: '1a2b3c4d5e6f7a8b9c0d1e2f',
          role: 'notvalidrole',
        };

        // When
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
