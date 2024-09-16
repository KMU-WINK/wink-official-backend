import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation } from '@wink/validation';

export class GetMembersForAdminRequestDto {
  @ApiProperty({
    description: '페이지',
    example: 1,
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsNumber()
  page!: number;
}
