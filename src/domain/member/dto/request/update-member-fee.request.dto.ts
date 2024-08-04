import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, Matches } from 'class-validator';

export class UpdateMemberFeeRequestDto {
  @Matches(/^[0-9a-fA-F]{24}$/, { message: '올바른 멤버 ID가 아닙니다.' })
  @ApiProperty({
    description: '멤버 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  memberId: string;

  @IsBoolean({ message: '올바른 회비 납부 여부가 아닙니다.' })
  @ApiProperty({
    description: '회비 납부 여부',
    example: false,
  })
  fee: boolean;
}
