import { ApiProperty } from '@nestjs/swagger';

import { Study } from '@wink/activity/schema';

export class GetStudiesResponse {
  @ApiProperty({
    description: '스터디 목록',
    type: [Study],
  })
  studies!: Study[];
}
