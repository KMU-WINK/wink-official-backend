import { ApiProperty } from '@nestjs/swagger';

import { CustomValidation } from '../../../../utils';

export class UpdateMemberFeeRequestDto {
  @ApiProperty({
    description: '멤버 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @CustomValidation.IsObjectId()
  memberId: string;

  @ApiProperty({
    description: '회비 납부 여부',
    example: false,
  })
  @CustomValidation.NotEmpty()
  @CustomValidation.IsBoolean()
  fee: boolean;
}
