import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsKookminEmail, NotEmpty } from '../../../../common/utils/validation';

export class SendCodeRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'honggildong@kookmin.ac.kr',
  })
  @NotEmpty()
  @IsEmail()
  @IsKookminEmail()
  email: string;
}
