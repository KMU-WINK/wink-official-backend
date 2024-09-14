import { ApiProperty } from '@nestjs/swagger';

import { Social } from '@wink/activity/schema';

export class CreateSocialResponseDto {
  @ApiProperty({
    description: '친목 활동',
    example: {},
  })
  social!: Social;
}
