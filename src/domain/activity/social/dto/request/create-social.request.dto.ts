import { ApiProperty } from '@nestjs/swagger';

import { Content } from '@wink/activity/schema';

import { CommonValidation, StringValidation, TypeValidation } from '@wink/validation';

export class CreateSocialRequestDto {
  @ApiProperty({
    description: '제목',
    example: '2024년 개강총회 진행',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.MinLength(4)
  @StringValidation.MaxLength(100)
  title!: string;

  @ApiProperty({
    description: '내용',
    example: [
      {
        content: '2024년에 개강총회를 진행했어요.',
        image:
          'https://kmu-wink.s3.ap-northeast-2.amazonaws.com/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.jpeg',
      },
    ],
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsSocialArray()
  contents!: Content[];
}
