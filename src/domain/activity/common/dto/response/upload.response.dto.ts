import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({
    description: '파일 URL',
    example:
      'https://kmu-wink.s3.ap-northeast-2.amazonaws.com/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.jpeg',
  })
  link!: string;
}
