import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProjectService } from '@wink/activity/service';

@Controller('/activity/project')
@ApiTags('Activity [프로젝트]')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
}
