import { ApiProperty } from '@nestjs/swagger';

import {
  CanEmpty,
  IsGithubUrl,
  IsInstagramUrl,
  IsUrl,
  MaxLength,
} from '../../../../common/utils/validation';

export class UpdateMyInfoRequestDto {
  @ApiProperty({
    description: '한 줄 소개',
    example: '안녕하세요! 저는 개발자입니다.',
  })
  @MaxLength(20)
  @CanEmpty()
  description?: string;

  @ApiProperty({
    description: 'Github URL',
    example: 'https://github.com/honggildong',
  })
  @IsGithubUrl()
  @CanEmpty()
  github?: string;

  @ApiProperty({
    description: 'Instagram URL',
    example: 'https://www.instagram.com/honggildong',
  })
  @IsInstagramUrl()
  @CanEmpty()
  instagram?: string;

  @ApiProperty({
    description: '블로그 URL',
    example: 'https://honggildong.tistory.com/',
  })
  @IsUrl()
  @CanEmpty()
  blog?: string;
}
