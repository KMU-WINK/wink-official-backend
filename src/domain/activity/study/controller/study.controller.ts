import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  GetCategoriesResponseDto,
  GetStudiesPageResponse,
  GetStudiesResponse,
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
  @ApiCustomResponse(GetStudiesPageResponse)
  async getStudiesPage(): Promise<GetStudiesPageResponse> {
    return this.studyService.getStudiesPage();
  }

  @Get('/:page')
  @ApiOperation({ summary: '스터디 목록' })
  @ApiCustomResponse(GetStudiesResponse)
  async getStudies(@Param('page', ParseIntPipe) page: number): Promise<GetStudiesResponse> {
    return this.studyService.getStudies(page);
  }
}
