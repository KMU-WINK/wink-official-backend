import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../constant/Role';

import { CustomValidation } from '../../../../utils';

export class UpdateMemberRoleRequestDto {
  @ApiProperty({
    description: '멤버 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @CustomValidation.IsObjectId()
  memberId: string;

  @ApiProperty({
    description: '역할',
    enum: Role,
    example: Role.MEMBER,
  })
  @CustomValidation.NotEmpty()
  @CustomValidation.IsEnum(Role)
  role: Role;
}
