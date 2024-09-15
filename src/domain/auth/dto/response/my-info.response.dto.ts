import { ApiProperty } from '@nestjs/swagger';

import { Member } from '@wink/member/schema';

export class MyInfoResponseDto {
  @ApiProperty({
    description: '사용자',
    example: {
      member: {
        _id: '60f6b5c3f5d0e7b2c2a3c2b0',
        createdAt: '2021-07-20T07:47:07.000Z',
        updatedAt: '2021-07-20T07:47:07.000Z',
        name: '홍길동',
        studentId: '20240001',
        email: 'honggildong@kookmin.ac.kr',
        avatar:
          'https://kmu-wink.s3.ap-northeast-2.amazonaws.com/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.jpeg',
        description: '안녕하세요',
        link: {
          github: 'https://github.com/hongildong',
          instagram: 'https://www.instagram.com/hongildong/',
          blog: 'https://hongildong.tistory.com/',
        },
        role: 'MEMBER',
        fee: true,
      },
    },
  })
  member!: Member;
}
