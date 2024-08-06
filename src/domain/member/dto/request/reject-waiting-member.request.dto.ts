import { ApiProperty } from '@nestjs/swagger';

import {
  CommonValidation,
  StringValidation,
  TypeValidation,
} from '../../../../common/utils/validation';

export class RejectWaitingMemberRequestDto {
  @ApiProperty({
    description: '멤버 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsMongoId()
  toId!: string;
}
