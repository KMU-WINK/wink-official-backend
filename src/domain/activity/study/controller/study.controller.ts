import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetStudiesResponse } from '@wink/activity/dto';
import { StudyService } from '@wink/activity/service';

import { ApiCustomResponse } from '@wink/swagger';

@Controller('/activity/study')
@ApiTags('Activity [스터디]')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Get()
  @ApiOperation({ summary: '스터디 목록' })
  @ApiCustomResponse(GetStudiesResponse)
  async getStudies(): Promise<GetStudiesResponse> {
    return this.studyService.getStudies();
  }
}
