import { ApiProperty } from '@nestjs/swagger';

import { Category } from '@wink/activity/schema';

export class CreateCategoryResponseDto {
  @ApiProperty({
    description: '카테고리',
    type: Category,
  })
  category!: Category;
}
