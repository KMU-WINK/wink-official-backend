import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import {
  GetSocialRequestDto,
  GetSocialResponseDto,
  GetSocialsPageResponseDto,
  GetSocialsRequestDto,
  GetSocialsResponseDto,
  SearchSocialsRequestDto,
} from '@wink/activity/dto';
import { SocialNotFoundException } from '@wink/activity/exception';
import { SocialService } from '@wink/activity/service';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/activity/social')
@ApiTags('Activity [친목]')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('/detail')
  @ApiOperation({ summary: '친목 활동 상세 조회' })
  @ApiProperty({ type: GetSocialRequestDto })
  @ApiCustomResponse(GetSocialResponseDto)
  @ApiCustomErrorResponse([SocialNotFoundException])
  async getSocial(@Query() request: GetSocialRequestDto): Promise<GetSocialResponseDto> {
    return this.socialService.getSocial(request);
  }

  @Get('/max')
  @ApiOperation({ summary: '친목 활동 최대 페이지' })
  @ApiCustomResponse(GetSocialsPageResponseDto)
  async getSocialsPage(): Promise<GetSocialsPageResponseDto> {
    return this.socialService.getSocialsPage();
  }

  @Get('/search')
  @ApiOperation({ summary: '친목 활동 검색' })
  @ApiProperty({ type: SearchSocialsRequestDto })
  @ApiCustomResponse(GetSocialsResponseDto)
  async searchProjects(@Query() request: SearchSocialsRequestDto): Promise<GetSocialsResponseDto> {
    return this.socialService.searchSocials(request);
  }

  @Get()
  @ApiOperation({ summary: '친목 활동 목록' })
  @ApiCustomResponse(GetSocialsResponseDto)
  async getSocials(@Query() request: GetSocialsRequestDto): Promise<GetSocialsResponseDto> {
    return this.socialService.getSocials(request);
  }
}
