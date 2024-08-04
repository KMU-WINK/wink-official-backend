import { ApiProperty } from '@nestjs/swagger';

import { CustomValidation } from '../../../../utils';

export class LoginRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'test@gmail.com',
  })
  @CustomValidation.NotEmpty()
  @CustomValidation.IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  @CustomValidation.NotEmpty()
  password: string;
}
