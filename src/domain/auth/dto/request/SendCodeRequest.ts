import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendCodeRequest {
  @IsNotEmpty({ message: '이메일은 필수 입력 값입니다.' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  email: string;
}
