import { ApiProperty } from '@nestjs/swagger';

import { IsPassword, NotEmpty } from '../../../../common/utils/validation';

export class UpdateMyPasswordRequestDto {
  @ApiProperty({
    description: '기존 비밀번호',
    example: 'p4ssw0rd!',
  })
  @NotEmpty()
  password?: string;

  @ApiProperty({
    description: '새 비밀번호',
    example: 'n3wp4ssw0rd!',
  })
  @IsPassword()
  newPassword?: string;
}
