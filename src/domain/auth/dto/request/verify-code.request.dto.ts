import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNumberString, Length, NotEmpty } from '../../../../common/utils/validation';

export class VerifyCodeRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  @NotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '인증코드',
    example: '123456',
  })
  @IsNumberString()
  @Length(6)
  code: string;
}
