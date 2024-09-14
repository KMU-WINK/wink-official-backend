import { ApiProperty } from '@nestjs/swagger';

import { Social } from '@wink/activity/schema';

export class GetSocialsResponseDto {
  @ApiProperty({
    description: '친목 활동 목록 (최근 6개)',
    example: [],
  })
  socials!: Social[];
}
