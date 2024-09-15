import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import {
  GetCategoriesResponseDto,
  GetStudiesPageResponseDto,
  GetStudiesRequestDto,
  GetStudiesResponseDto,
} from '@wink/activity/dto';
import { StudyService } from '@wink/activity/service';

import { ApiCustomResponse } from '@wink/swagger';

@Controller('/activity/study')
@ApiTags('Activity [스터디]')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Get('/category')
  @ApiOperation({ summary: '스터디 카테고리 목록' })
  @ApiCustomResponse(GetCategoriesResponseDto)
  async getCategories(): Promise<GetCategoriesResponseDto> {
    return this.studyService.getCategories();
  }

  @Get('/max')
  @ApiOperation({ summary: '스터디 최대 페이지' })
  @ApiCustomResponse(GetStudiesPageResponseDto)
  async getStudiesPage(): Promise<GetStudiesPageResponseDto> {
    return this.studyService.getStudiesPage();
  }

  @Get()
  @ApiOperation({ summary: '스터디 목록' })
  @ApiProperty({ type: GetStudiesRequestDto })
  @ApiCustomResponse(GetStudiesResponseDto)
  async getStudies(@Body() request: GetStudiesRequestDto): Promise<GetStudiesResponseDto> {
    return this.studyService.getStudies(request);
  }
}
