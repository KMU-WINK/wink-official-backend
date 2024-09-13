import { Body, Controller, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AuthAdminAccount, AuthAdminAccountException, ReqMember } from '@wink/auth/guard';

import { Member } from '@wink/member/schema';

import {
  CreateStudyRequestDto,
  CreateStudyResponseDto,
  DeleteStudyRequestDto,
} from '@wink/activity/dto';
import { StudyNotFoundException } from '@wink/activity/exception';
import { StudyAdminService } from '@wink/activity/service';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/admin/activity/study')
@ApiTags('[Admin] Activity [스터디]')
export class StudyAdminController {
  constructor(private readonly studyAdminService: StudyAdminService) {}

  @Put()
  @AuthAdminAccount()
  @ApiOperation({ summary: '스터디 생성' })
  @ApiProperty({ type: CreateStudyRequestDto })
  @ApiCustomResponse(CreateStudyResponseDto)
  @ApiCustomErrorResponse([...AuthAdminAccountException])
  async createStudy(
    @ReqMember() member: Member,
    @Body() request: CreateStudyRequestDto,
  ): Promise<CreateStudyResponseDto> {
    return this.studyAdminService.createStudy(member, request);
  }

  @Delete()
  @AuthAdminAccount()
  @ApiOperation({ summary: '스터디 삭제' })
  @ApiProperty({ type: DeleteStudyRequestDto })
  @ApiCustomErrorResponse([...AuthAdminAccountException, StudyNotFoundException])
  async deleteStudy(@Body() request: DeleteStudyRequestDto): Promise<void> {
    return this.studyAdminService.deleteStudy(request);
  }
}
