import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation, StringValidation } from '@wink/validation';

export class VerifyCodeRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsEmail()
  email!: string;

  @ApiProperty({
    description: '인증코드',
    example: '123456',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsNumberString()
  @StringValidation.Length(6)
  code!: string;
}
