import { ApiProperty } from '@nestjs/swagger';

import { CustomValidation } from '../../../../utils';

export class UpdateMyPasswordRequestDto {
  @ApiProperty({
    description: '기존 비밀번호',
    example: 'p4ssw0rd!',
  })
  @CustomValidation.NotEmpty()
  password?: string;

  @ApiProperty({
    description: '새 비밀번호',
    example: 'n3wp4ssw0rd!',
  })
  @CustomValidation.IsPassword()
  newPassword?: string;
}
