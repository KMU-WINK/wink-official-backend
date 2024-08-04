import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, Matches } from 'class-validator';

export class ApproveWaitingMemberRequestDto {
  @IsNotEmpty({ message: '멤버 ID는 필수 입력 값입니다.' })
  @Matches(/^[0-9a-fA-F]{24}$/, { message: '올바른 멤버 ID가 아닙니다.' })
  @ApiProperty({
    description: '멤버 ID',
    example: '1a2b3c4d5e6f7g8h9i0j1k2l',
  })
  memberId: string;
}
