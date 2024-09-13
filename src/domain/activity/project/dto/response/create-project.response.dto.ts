import { ApiProperty } from '@nestjs/swagger';

import { Project } from '@wink/activity/project/schema';

export class CreateProjectResponseDto {
  @ApiProperty({
    description: '프로젝트',
    example: {
      _id: '1a2b3c4d5e6f7a8b9c0d1e2f',
      createdAt: '2024-08-01T00:00:00.000Z',
      updatedAt: '2024-08-01T00:00:00.000Z',
      title: '공식 홈페이지 프로젝트',
      content: '공식 홈페이지를 뚝딱뚝딱...',
      image:
        'https://kmu-wink.s3.ap-northeast-2.amazonaws.com/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.jpeg',
      author: {
        _id: '60f6b5c3f5d0e7b2c2a3c2b0',
        createdAt: '2021-07-20T07:47:07.000Z',
        updatedAt: '2021-07-20T07:47:07.000Z',
        name: '홍길동',
        avatar: 'https://blog.kakaocdn.net/dn/.../img.png',
      },
    },
  })
  project!: Project;
}
