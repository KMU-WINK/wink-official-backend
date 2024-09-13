import { ApiProperty } from '@nestjs/swagger';

import { Study } from '@wink/activity/schema';

export class GetStudiesResponse {
  @ApiProperty({
    description: '스터디 목록',
    type: [Study],
    example: [
      {
        _id: '1a2b3c4d5e6f7a8b9c0d1e2f',
        createdAt: '2024-08-01T00:00:00.000Z',
        updatedAt: '2024-08-01T00:00:00.000Z',
        title: '[React.js] 1주차 스터디',
        content: 'React.js는 뭐 어쩌고 기반이고... Virtual Dom을 사용 어쩌고...',
        author: '홍길동',
        image: 'https://blog.kakaocdn.net/dn/.../img.png',
        link: 'https://cs-kookmin-club.tistory.com/0',
        uploadedAt: '2023-01-01T00:00:00.000Z',
        category: {
          _id: '1a2b3c4d5e6f7a8b9c0d1e2f',
          name: 'React.js',
        },
      },
    ],
  })
  studies!: Study[];
}
