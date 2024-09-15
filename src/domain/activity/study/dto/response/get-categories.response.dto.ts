import { ApiProperty } from '@nestjs/swagger';

import { Category } from '@wink/activity/schema';

export class GetCategoriesResponseDto {
  @ApiProperty({
    description: '카테고리 목록',
    type: [Category],
    example: [
      {
        _id: '1a2b3c4d5e6f7a8b9c0d1e2f',
        name: 'React.js 스터디',
      },
    ],
  })
  categories!: Category[];
}
