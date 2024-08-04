import { ApiProperty } from '@nestjs/swagger';

import { MyInfoLinks } from '../../member.schema';
import { Role } from '../../constant/Role';

export class EachGetMembersResponseDto {
  @ApiProperty({
    description: '멤버 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  memberId: string;

  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  name: string;

  @ApiProperty({
    description: '프로필 사진 URL',
    example:
      'https://kmu-wink.s3.ap-northeast-2.amazonaws.com/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.jpeg',
  })
  avatar: string;

  @ApiProperty({
    description: '한 줄 소개',
    example: '안녕하세요! 저는 개발자입니다.',
  })
  description?: string;

  @ApiProperty({
    description: '링크',
    example: {
      github: 'https://github.com/hongildong',
      instagram: 'https://www.instagram.com/hongildong',
      blog: 'https://hongildong.tistory.com',
    },
  })
  link: MyInfoLinks;

  @ApiProperty({
    description: '역할',
    enum: Role,
    example: Role.MEMBER,
  })
  role: Role;
}

export class EachGetMembersForAdminResponseDto extends EachGetMembersResponseDto {
  @ApiProperty({
    description: '학번',
    example: 20240001,
  })
  studentId: number;

  @ApiProperty({
    description: '회비 납부 여부',
    example: false,
  })
  fee: boolean;
}

export class GetMembersResponseDto {
  @ApiProperty({
    description: '부원 목록',
    type: [EachGetMembersResponseDto],
  })
  members: EachGetMembersResponseDto[];
}

export class GetMembersForAdminResponseDto {
  @ApiProperty({
    description: '부원 목록',
    type: [EachGetMembersForAdminResponseDto],
  })
  members: EachGetMembersForAdminResponseDto[];
}
