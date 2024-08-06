import { ApiProperty } from '@nestjs/swagger';

import {
  CommonValidation,
  TypeValidation,
  StringValidation,
} from '../../../../common/utils/validation';

export class SendCodeRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsEmail()
  @StringValidation.IsKookminEmail()
  email!: string;
}
