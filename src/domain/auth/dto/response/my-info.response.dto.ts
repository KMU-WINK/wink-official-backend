import { ApiProperty } from '@nestjs/swagger';

import { Role, MyInfoLinks } from '@wink/member/schema';

export class MyInfoResponseDto {
  @ApiProperty({
    description: '멤버 아이디',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  memberId!: string;

  @ApiProperty({
    description: '계정 생성일',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: '계정 수정일',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt!: Date;

  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  name!: string;

  @ApiProperty({
    description: '학번',
    example: '20240001',
  })
  studentId!: string;

  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  email!: string;

  @ApiProperty({
    description: '아이콘 URL',
    example:
      'https://kmu-wink.s3.ap-northeast-2.amazonaws.com/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.jpeg',
  })
  avatar!: string | null;

  @ApiProperty({
    description: '자기소개',
    example: '안녕하세요',
  })
  description!: string | null;

  @ApiProperty({
    description: '링크',
    type: Object,
    example: {
      github: 'https://github.com/hongildong',
      instagram: 'https://www.instagram.com/hongildong/',
      blog: 'https://hongildong.tistory.com/',
    },
  })
  link!: MyInfoLinks;

  @ApiProperty({
    description: '역할',
    enum: Role,
    example: Role.MEMBER,
  })
  role!: Role | null;

  @ApiProperty({
    description: '회비 납부 여부',
    example: true,
  })
  fee!: boolean;
}
