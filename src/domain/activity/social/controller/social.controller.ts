import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import {
  GetSocialRequestDto,
  GetSocialResponseDto,
  GetSocialsResponseDto,
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
  async getProject(@Body() request: GetSocialRequestDto): Promise<GetSocialResponseDto> {
    return this.socialService.getSocial(request);
  }

  @Get()
  @ApiOperation({ summary: '친목 활동 목록' })
  @ApiCustomResponse(GetSocialsResponseDto)
  async getSocials(): Promise<GetSocialsResponseDto> {
    return this.socialService.getSocials();
  }
}
