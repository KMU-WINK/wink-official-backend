import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, StringValidation, TypeValidation } from '@wink/validation';

export class UpdateMyPasswordRequestDto {
  @ApiProperty({
    description: '기존 비밀번호',
    example: 'p4ssw0rd!',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  password!: string;

  @ApiProperty({
    description: '새 비밀번호',
    example: 'n3wp4ssw0rd!',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.MinLength(8)
  @StringValidation.IsPassword()
  newPassword!: string;
}
