import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class VerifyCodeRequest {
  @IsNotEmpty({ message: '이메일은 필수 입력 값입니다.' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  email: string;

  @IsNotEmpty({ message: '인증코드는 필수 입력 값입니다.' })
  @IsNumberString({ no_symbols: true }, { message: '올바른 인증코드가 아닙니다.' })
  @Length(6, 6, { message: '인증코드는 6자리 숫자로 입력해주세요.' })
  @ApiProperty({
    description: '인증코드',
    example: '123456',
  })
  code: string;
}
