import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation } from '@wink/validation';

export class SearchProjectsRequestDto {
  @ApiProperty({
    description: '검색어',
    example: '김',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  query!: string;
}
