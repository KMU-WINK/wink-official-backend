import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation } from '@wink/validation';

export class RefreshRequestDto {
  @ApiProperty({
    description: 'Refresh Token',
    example: 'A.B.C',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  refreshToken!: string;
}
