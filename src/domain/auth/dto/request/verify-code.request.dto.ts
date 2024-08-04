import { ApiProperty } from '@nestjs/swagger';

import { CustomValidation } from '../../../../utils';

export class VerifyCodeRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  @CustomValidation.NotEmpty()
  @CustomValidation.IsEmail()
  email: string;

  @ApiProperty({
    description: '인증코드',
    example: '123456',
  })
  @CustomValidation.IsNumberString()
  @CustomValidation.Length(6)
  code: string;
}
