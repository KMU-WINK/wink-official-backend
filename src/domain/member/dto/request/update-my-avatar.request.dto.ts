import { ApiProperty } from '@nestjs/swagger';

export class UpdateMyAvatarRequestDto {
  @ApiProperty({
    description: '프로필 사진',
    type: 'string',
    format: 'binary',
  })
  avatar!: Express.Multer.File;
}
