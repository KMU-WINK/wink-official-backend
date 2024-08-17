import { ApiProperty } from '@nestjs/swagger';

import { CommonValidation, StringValidation, TypeValidation } from '@wink/validation';

export class UpdateMyInfoRequestDto {
  @ApiProperty({
    description: '한 줄 소개',
    example: '안녕하세요! 저는 개발자입니다.',
  })
  @CommonValidation.IsOptional()
  @TypeValidation.IsString()
  @StringValidation.MaxLength(20)
  description!: string | null;

  @ApiProperty({
    description: 'Github URL',
    example: 'https://github.com/honggildong',
  })
  @CommonValidation.IsOptional()
  @TypeValidation.IsString()
  @StringValidation.IsGithubUrl()
  github!: string | null;

  @ApiProperty({
    description: 'Instagram URL',
    example: 'https://www.instagram.com/honggildong',
  })
  @CommonValidation.IsOptional()
  @TypeValidation.IsString()
  @StringValidation.IsInstagramUrl()
  instagram!: string | null;

  @ApiProperty({
    description: '블로그 URL',
    example: 'https://honggildong.tistory.com/',
  })
  @CommonValidation.IsOptional()
  @TypeValidation.IsString()
  @StringValidation.IsUrl()
  blog!: string | null;
}
