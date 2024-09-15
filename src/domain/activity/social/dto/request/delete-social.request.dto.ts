import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, StringValidation, TypeValidation } from '@wink/validation';

export class DeleteSocialRequestDto {
  @ApiProperty({
    description: '친목 활동 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsMongoId()
  socialId!: string;
}
