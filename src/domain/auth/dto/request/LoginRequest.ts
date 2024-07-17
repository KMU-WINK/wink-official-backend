import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: '이메일',
    example: 'test@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  password: string;
}
