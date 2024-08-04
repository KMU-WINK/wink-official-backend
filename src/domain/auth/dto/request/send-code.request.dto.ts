import { ApiProperty } from '@nestjs/swagger';

import { CustomValidation } from '../../../../utils';

export class SendCodeRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  @CustomValidation.NotEmpty()
  @CustomValidation.IsEmail()
  email: string;
}
