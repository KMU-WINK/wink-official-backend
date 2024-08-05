import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, NotEmpty } from '../../../../common/utils/validation';

export class LoginRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'test@gmail.com',
  })
  @NotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  @NotEmpty()
  password: string;
}
