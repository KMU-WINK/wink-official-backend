import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
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
