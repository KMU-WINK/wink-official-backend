import { ApiProperty } from '@nestjs/swagger';

import { Project } from '@wink/activity/schema';

export class CreateProjectResponseDto {
  @ApiProperty({
    description: '프로젝트',
    example: {},
  })
  project!: Project;
}
