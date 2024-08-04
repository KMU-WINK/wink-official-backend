import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, Matches } from 'class-validator';
import { Role } from '../../constant/Role';

export class UpdateMemberRoleRequestDto {
  @Matches(/^[0-9a-fA-F]{24}$/, { message: '올바른 멤버 ID가 아닙니다.' })
  @ApiProperty({
    description: '멤버 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  memberId: string;

  @IsEnum(Role, { message: '올바른 역할이 아닙니다.' })
  @ApiProperty({
    description: '역할',
    enum: Role,
    example: Role.MEMBER,
  })
  role: Role;
}