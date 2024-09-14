import { Body, Controller, Delete, Patch, Put } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AuthAdminAccount, AuthAdminAccountException, ReqMember } from '@wink/auth/guard';

import { Member } from '@wink/member/schema';

import {
  CreateProjectRequestDto,
  CreateProjectResponseDto,
  DeleteProjectRequestDto,
  UpdateProjectRequestDto,
} from '@wink/activity/dto';
import { AlreadyExistsProjectException, ProjectNotFoundException } from '@wink/activity/exception';
import { ProjectAdminService } from '@wink/activity/service';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/admin/activity/project')
@ApiTags('[Admin] Activity [프로젝트]')
export class ProjectAdminController {
  constructor(private readonly projectAdminService: ProjectAdminService) {}

  @Put()
  @AuthAdminAccount()
  @ApiOperation({ summary: '프로젝트 생성' })
  @ApiProperty({ type: CreateProjectRequestDto })
  @ApiCustomResponse(CreateProjectResponseDto)
  @ApiCustomErrorResponse([...AuthAdminAccountException, AlreadyExistsProjectException])
  async createProject(
    @ReqMember() member: Member,
    @Body() request: CreateProjectRequestDto,
  ): Promise<CreateProjectResponseDto> {
    return this.projectAdminService.createProject(member, request);
  }

  @Patch()
  @AuthAdminAccount()
  @ApiOperation({ summary: '프로젝트 수정' })
  @ApiProperty({ type: UpdateProjectRequestDto })
  @ApiCustomErrorResponse([
    ...AuthAdminAccountException,
    ProjectNotFoundException,
    AlreadyExistsProjectException,
  ])
  async updateProject(@Body() request: UpdateProjectRequestDto): Promise<void> {
    return this.projectAdminService.updateProject(request);
  }

  @Delete()
  @AuthAdminAccount()
  @ApiOperation({ summary: '프로젝트 삭제' })
  @ApiProperty({ type: DeleteProjectRequestDto })
  @ApiCustomErrorResponse([...AuthAdminAccountException, ProjectNotFoundException])
  async deleteProject(@Body() request: DeleteProjectRequestDto): Promise<void> {
    return this.projectAdminService.deleteProject(request);
  }
}
