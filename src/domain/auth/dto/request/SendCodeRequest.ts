import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendCodeRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  email: string;
}
