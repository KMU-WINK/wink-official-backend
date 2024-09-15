import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, StringValidation, TypeValidation } from '@wink/validation';

export class DeleteStudyRequestDto {
  @ApiProperty({
    description: '스터디 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsMongoId()
  studyId!: string;
}
