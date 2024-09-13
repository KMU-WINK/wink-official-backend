import { ApiProperty } from '@nestjs/swagger';

import { Study } from '@wink/activity/schema';

export class CreateStudyResponseDto {
  @ApiProperty({
    description: '스터디',
  })
  study!: Study;
}
