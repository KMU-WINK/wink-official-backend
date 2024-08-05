import { ApiProperty } from '@nestjs/swagger';

import { IsObjectId } from '../../../../common/utils/validation';

export class RejectWaitingMemberRequestDto {
  @ApiProperty({
    description: '멤버 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @IsObjectId()
  memberId: string;
}
