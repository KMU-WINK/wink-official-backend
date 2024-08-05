import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, NotEmpty } from '../../../../common/utils/validation';

export class SendCodeRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  @NotEmpty()
  @IsEmail()
  email: string;
}
