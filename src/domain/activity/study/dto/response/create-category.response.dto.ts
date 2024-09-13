import { ApiProperty } from '@nestjs/swagger';

import { Category } from '@wink/activity/schema';

export class CreateCategoryResponseDto {
  @ApiProperty({
    description: '카테고리',
    example: {
      _id: '1a2b3c4d5e6f7a8b9c0d1e2f',
      name: 'React.js 스터디',
    },
  })
  category!: Category;
}
