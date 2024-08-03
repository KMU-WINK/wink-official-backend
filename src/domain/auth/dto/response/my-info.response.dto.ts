import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../../member/constant/Role';
import { MyInfoLinks } from '../../../member/member.schema';

export class MyInfoResponseDto {
  @ApiProperty({
    description: '유저 아이디',
    example: '1a2b3c4d5e6f7g8h9i0j1k2l',
  })
  userId: string;

  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  name: string;

  @ApiProperty({
    description: '학번',
    example: 20240001,
  })
  studentId: number;

  @ApiProperty({
    description: '유저 아이콘 URL',
    example: 'https://example.com/avatar.png',
  })
  avatar?: string;

  @ApiProperty({
    description: '자기소개',
    example: '안녕하세요',
  })
  description?: string;

  @ApiProperty({
    description: '링크',
    type: Object,
    example: {
      github: 'https://github.com/hongildong',
      instagram: 'https://www.instagram.com/hongildong/',
      blog: 'https://hongildong.tistory.com/',
    },
  })
  link: MyInfoLinks;

  @ApiProperty({
    description: '역할',
    enum: Role,
    example: Role.MEMBER,
  })
  role: Role;

  @ApiProperty({
    description: '회비 납부 여부',
    example: true,
  })
  fee: boolean;
}
