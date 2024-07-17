import { ApiProperty } from '@nestjs/swagger';

import { IsEmail } from 'class-validator';

export class SendCodeRequest {
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  email: string;
}
