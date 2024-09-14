import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import {
  GetProjectRequestDto,
  GetProjectResponseDto,
  GetProjectsPageResponseDto,
  GetProjectsResponseDto,
} from '@wink/activity/dto';
import { ProjectService } from '@wink/activity/service';

import { ApiCustomResponse } from '@wink/swagger';

@Controller('/activity/project')
@ApiTags('Activity [프로젝트]')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/detail')
  @ApiOperation({ summary: '프로젝트 상세 조회' })
  @ApiProperty({ type: GetProjectRequestDto })
  @ApiCustomResponse(GetProjectResponseDto)
  async getProject(@Body() request: GetProjectRequestDto): Promise<GetProjectResponseDto> {
    return this.projectService.getProject(request);
  }

  @Get('/max')
  @ApiOperation({ summary: '프로젝트 최대 페이지' })
  @ApiCustomResponse(GetProjectsPageResponseDto)
  async getProjectsPage(): Promise<GetProjectsPageResponseDto> {
    return this.projectService.getProjectsPage();
  }

  @Get('/:page')
  @ApiOperation({ summary: '프로젝트 목록' })
  @ApiCustomResponse(GetProjectsResponseDto)
  async getProjects(@Param('page', ParseIntPipe) page: number): Promise<GetProjectsResponseDto> {
    return this.projectService.getProjects(page);
  }
}
