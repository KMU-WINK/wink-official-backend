import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: '이메일은 필수 입력 값입니다.' })
  @IsEmail(null, { message: '이메일 형식이 아닙니다.' })
  @ApiProperty({
    description: '이메일',
    example: 'test@gmail.com',
  })
  email: string;

  @IsNotEmpty({ message: '비밀번호는 필수 입력 값입니다.' })
  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  password: string;
}
