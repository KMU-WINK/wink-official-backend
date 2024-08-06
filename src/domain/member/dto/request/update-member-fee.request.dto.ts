import { ApiProperty } from '@nestjs/swagger';

import {
  CommonValidation,
  StringValidation,
  TypeValidation,
} from '../../../../common/utils/validation';

export class UpdateMemberFeeRequestDto {
  @ApiProperty({
    description: '멤버 ID (자신보다 권한이 낮은 멤버)',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsMongoId()
  toId!: string;

  @ApiProperty({
    description: '회비 납부 여부',
    example: false,
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsBoolean()
  fee!: boolean;
}
