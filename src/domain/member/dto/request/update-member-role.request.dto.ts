import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { Role } from '../../constant/Role';

export class UpdateMemberRoleRequestDto {
  @IsNotEmpty({ message: '유저 ID는 필수 입력 값입니다.' })
  @Matches(/^[0-9a-fA-F]{24}$/, { message: '올바른 유저 ID가 아닙니다.' })
  @ApiProperty({
    description: '유저 ID',
    example: '1a2b3c4d5e6f7g8h9i0j1k2l',
  })
  userId: string;

  @IsNotEmpty({ message: '역할은 필수 입력 값입니다.' })
  @IsEnum(Role)
  @ApiProperty({
    description: '역할',
    enum: Role,
    example: Role.MEMBER,
  })
  role: Role;
}
