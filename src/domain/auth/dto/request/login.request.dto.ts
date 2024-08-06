import { ApiProperty } from '@nestjs/swagger';

import {
  CommonValidation,
  TypeValidation,
  StringValidation,
} from '../../../../common/utils/validation';

export class LoginRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'test@kookmin.ac.kr',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsEmail()
  email!: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'p4sSw0rd!',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  password!: string;
}
