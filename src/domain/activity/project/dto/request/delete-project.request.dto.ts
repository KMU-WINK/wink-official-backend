import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation, StringValidation } from '@wink/validation';

export class DeleteProjectRequestDto {
  @ApiProperty({
    description: '프로젝트 ID',
    example: '1a2b3c4d5e6f7a8b9c0d1e2f',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsMongoId()
  projectId!: string;
}
