import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import {
  GetProjectRequestDto,
  GetProjectResponseDto,
  GetProjectsPageResponseDto,
  GetProjectsRequestDto,
  GetProjectsResponseDto,
  SearchProjectsRequestDto,
} from '@wink/activity/dto';
import { ProjectNotFoundException } from '@wink/activity/exception';
import { ProjectService } from '@wink/activity/service';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/activity/project')
@ApiTags('Activity [프로젝트]')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/detail')
  @ApiOperation({ summary: '프로젝트 상세 조회' })
  @ApiProperty({ type: GetProjectRequestDto })
  @ApiCustomResponse(GetProjectResponseDto)
  @ApiCustomErrorResponse([ProjectNotFoundException])
  async getProject(@Query() request: GetProjectRequestDto): Promise<GetProjectResponseDto> {
    return this.projectService.getProject(request);
  }

  @Get('/max')
  @ApiOperation({ summary: '프로젝트 최대 페이지' })
  @ApiCustomResponse(GetProjectsPageResponseDto)
  async getProjectsPage(): Promise<GetProjectsPageResponseDto> {
    return this.projectService.getProjectsPage();
  }

  @Get('/search')
  @ApiOperation({ summary: '프로젝트 검색' })
  @ApiProperty({ type: SearchProjectsRequestDto })
  @ApiCustomResponse(GetProjectsResponseDto)
  async searchProjects(
    @Query() request: SearchProjectsRequestDto,
  ): Promise<GetProjectsResponseDto> {
    return this.projectService.searchProjects(request);
  }

  @Get()
  @ApiOperation({ summary: '프로젝트 목록' })
  @ApiProperty({ type: GetProjectsRequestDto })
  @ApiCustomResponse(GetProjectsResponseDto)
  async getProjects(@Query() request: GetProjectsRequestDto): Promise<GetProjectsResponseDto> {
    return this.projectService.getProjects(request);
  }
}
