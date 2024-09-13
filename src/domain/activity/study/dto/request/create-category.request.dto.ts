import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation } from '@wink/validation';

export class CreateCategoryRequestDto {
  @ApiProperty({
    description: '카테고리',
    example: 'React.js 스터디',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  category!: string;
}
