import { ApiProperty } from '@nestjs/swagger';

import { Project } from '@wink/activity/schema';

export class GetProjectsResponseDto {
  @ApiProperty({
    description: '프로젝트 목록',
    example: [],
  })
  projects!: Project[];
}
