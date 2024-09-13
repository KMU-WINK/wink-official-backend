import { ApiProperty } from '@nestjs/swagger';

import { Category } from '@wink/activity/schema';

export class GetCategoriesResponseDto {
  @ApiProperty({
    description: '카테고리 목록',
    type: [Category],
  })
  categories!: Category[];
}
