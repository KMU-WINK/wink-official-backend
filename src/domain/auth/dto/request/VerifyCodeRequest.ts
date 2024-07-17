import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    description: '인증코드',
    example: '123456',
  })
  code: string;
}
