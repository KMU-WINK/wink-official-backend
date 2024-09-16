import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation } from '@wink/validation';

import { Type } from 'class-transformer';

export class GetMembersForAdminRequestDto {
  @ApiProperty({
    description: '페이지',
    example: 1,
  })
  @Type(() => Number)
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsNumber()
  page!: number;
}
