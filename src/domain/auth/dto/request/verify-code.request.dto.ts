import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNumberString, Length } from 'class-validator';

export class VerifyCodeRequestDto {
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  email: string;

  @IsNumberString({ no_symbols: true }, { message: '올바른 인증코드가 아닙니다.' })
  @Length(6, 6, { message: '인증코드는 6자리 숫자로 입력해주세요.' })
  @ApiProperty({
    description: '인증코드',
    example: '123456',
  })
  code: string;
}
