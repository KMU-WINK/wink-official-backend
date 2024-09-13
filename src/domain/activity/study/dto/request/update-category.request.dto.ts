import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation, StringValidation } from '@wink/validation';

export class UpdateCategoryRequestDto {
  @ApiProperty({
    description: '카테고리 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsMongoId()
  categoryId!: string;

  @ApiProperty({
    description: '카테고리',
    example: 'React.js 스터디',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  category!: string;
}