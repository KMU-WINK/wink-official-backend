import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../constant';

import {
  CommonValidation,
  StringValidation,
  TypeValidation,
} from '../../../../common/utils/validation';

export class UpdateMemberRoleRequestDto {
  @ApiProperty({
    description: '멤버 ID (자신보다 권한이 낮은 멤버)',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsMongoId()
  memberId!: string;

  @ApiProperty({
    description: '역할',
    enum: Role,
    example: Role.MEMBER,
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsEnum(Role)
  role!: Role;
}
