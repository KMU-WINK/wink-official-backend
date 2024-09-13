import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, TypeValidation, StringValidation } from '@wink/validation';

export class CreateProjectRequestDto {
  @ApiProperty({
    description: '제목',
    example: '공식 홈페이지 개발',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.MinLength(4)
  @StringValidation.MaxLength(64)
  title!: string;

  @ApiProperty({
    description: '태그',
    type: [String],
    example: ['웹', '프론트엔드', '백엔드'],
  })
  @CommonValidation.IsNotEmpty()
  tags!: string[];

  @ApiProperty({
    description: '내용',
    example: '공식 홈페이지를 뚝딱뚝딱,,.',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.MinLength(10)
  content!: string;

  @ApiProperty({
    description: '이미지',
    example:
      'https://kmu-wink.s3.ap-northeast-2.amazonaws.com/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.jpeg',
  })
  @CommonValidation.IsNotEmpty()
  @TypeValidation.IsString()
  @StringValidation.IsUrl()
  image!: string;
}
