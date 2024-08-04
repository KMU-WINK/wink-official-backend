import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsUrl, Length, Matches } from 'class-validator';

const GITHUB_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const INSTAGRAM_REGEX = /^(?!.*\.\.)(?!.*\.$)\w[\w.]{0,29}$/i;

export class UpdateMyInfoRequestDto {
  @IsOptional()
  @Length(1, 20, { message: '20자 이내로 입력해주세요.' })
  @ApiProperty({
    description: '한 줄 소개',
    example: '안녕하세요! 저는 개발자입니다.',
  })
  description?: string;

  @IsOptional()
  @Matches(GITHUB_REGEX, {
    message: '올바른 Github 아이디가 아닙니다.',
  })
  @ApiProperty({
    description: 'Github 아이디',
    example: 'honggildong',
  })
  github?: string;

  @IsOptional()
  @Matches(INSTAGRAM_REGEX, {
    message: '올바른 Instagram 아이디가 아닙니다.',
  })
  @ApiProperty({
    description: 'Instagram 아이디',
    example: 'honggildong',
  })
  instagram?: string;

  @IsOptional()
  @IsUrl({}, { message: '올바른 URL이 아닙니다.' })
  @ApiProperty({
    description: '블로그 URL',
    example: 'https://honggildong.tistory.com/',
  })
  blog?: string;
}
