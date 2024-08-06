import { ApiProperty } from '@nestjs/swagger';
import {
  CommonValidation,
  StringValidation,
  TypeValidation,
} from '../../../../common/utils/validation';

export class UpdateMyPasswordRequestDto {
  @ApiProperty({
    description: '기존 비밀번호',
    example: 'p4ssw0rd!',
  })
  @CommonValidation.IsOptional()
  @TypeValidation.IsString()
  password!: string;

  @ApiProperty({
    description: '새 비밀번호',
    example: 'n3wp4ssw0rd!',
  })
  @CommonValidation.IsOptional()
  @TypeValidation.IsString()
  @StringValidation.MinLength(8)
  @StringValidation.IsPassword()
  newPassword!: string;
}
