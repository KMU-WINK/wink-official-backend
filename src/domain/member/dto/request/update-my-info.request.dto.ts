import { ApiProperty } from '@nestjs/swagger';

import { CustomValidation } from '../../../../utils';

export class UpdateMyInfoRequestDto {
  @ApiProperty({
    description: '한 줄 소개',
    example: '안녕하세요! 저는 개발자입니다.',
  })
  @CustomValidation.MaxLength(20)
  @CustomValidation.CanEmpty()
  description?: string;

  @ApiProperty({
    description: 'Github 아이디',
    example: 'honggildong',
  })
  @CustomValidation.IsGithubUsername()
  @CustomValidation.CanEmpty()
  github?: string;

  @ApiProperty({
    description: 'Instagram 아이디',
    example: 'honggildong',
  })
  @CustomValidation.IsInstagramUsername()
  @CustomValidation.CanEmpty()
  instagram?: string;

  @ApiProperty({
    description: '블로그 URL',
    example: 'https://honggildong.tistory.com/',
  })
  @CustomValidation.IsUrl()
  @CustomValidation.CanEmpty()
  blog?: string;
}
