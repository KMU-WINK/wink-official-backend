import { Body, Controller, Delete, Patch, Put } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AuthAdminAccount, AuthAdminAccountException, ReqMember } from '@wink/auth/guard';

import { Member } from '@wink/member/schema';

import {
  CreateCategoryRequestDto,
  CreateCategoryResponseDto,
  CreateStudyRequestDto,
  CreateStudyResponseDto,
  DeleteCategoryRequestDto,
  DeleteStudyRequestDto,
  UpdateCategoryRequestDto,
} from '@wink/activity/dto';
import {
  AlreadyExistsCategoryException,
  CategoryNotFoundException,
  StudyNotFoundException,
} from '@wink/activity/exception';
import { StudyAdminService } from '@wink/activity/service';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/admin/activity/study')
@ApiTags('[Admin] Activity [스터디]')
export class StudyAdminController {
  constructor(private readonly studyAdminService: StudyAdminService) {}

  @Put('/category')
  @AuthAdminAccount()
  @ApiOperation({ summary: '카테고리 생성' })
  @ApiProperty({ type: CreateStudyRequestDto })
  @ApiCustomResponse(CreateStudyResponseDto)
  @ApiCustomErrorResponse([...AuthAdminAccountException, AlreadyExistsCategoryException])
  async createCategory(
    @Body() request: CreateCategoryRequestDto,
  ): Promise<CreateCategoryResponseDto> {
    return this.studyAdminService.createCategory(request);
  }

  @Patch('/category')
  @AuthAdminAccount()
  @ApiOperation({ summary: '카테고리 수정' })
  @ApiProperty({ type: CreateStudyRequestDto })
  @ApiCustomResponse(CreateStudyResponseDto)
  @ApiCustomErrorResponse([...AuthAdminAccountException, CategoryNotFoundException])
  async updateCategory(@Body() request: UpdateCategoryRequestDto): Promise<void> {
    return this.studyAdminService.updateCategory(request);
  }

  @Put('/category')
  @AuthAdminAccount()
  @ApiOperation({ summary: '카테고리 삭제' })
  @ApiProperty({ type: CreateStudyRequestDto })
  @ApiCustomResponse(CreateStudyResponseDto)
  @ApiCustomErrorResponse([...AuthAdminAccountException, CategoryNotFoundException])
  async deleteCategory(@Body() request: DeleteCategoryRequestDto): Promise<void> {
    return this.studyAdminService.deleteCategory(request);
  }

  @Put()
  @AuthAdminAccount()
  @ApiOperation({ summary: '스터디 생성' })
  @ApiProperty({ type: CreateStudyRequestDto })
  @ApiCustomResponse(CreateStudyResponseDto)
  @ApiCustomErrorResponse([...AuthAdminAccountException, CategoryNotFoundException])
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
