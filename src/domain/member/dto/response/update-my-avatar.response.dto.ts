import { ApiProperty } from '@nestjs/swagger';

export class UpdateMyAvatarResponseDto {
  @ApiProperty({
    description: '프로필 사진 URL',
    example:
      'https://kmu-wink.s3.ap-northeast-2.amazonaws.com/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.jpeg',
  })
  avatar!: string;
}
