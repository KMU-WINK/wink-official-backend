import { Body, Controller, Delete, Patch, Put } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { SocialAdminService } from '@wink/activity/service';
import { AuthAdminAccount, AuthAdminAccountException } from '@wink/auth/guard';
import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';
import {
  CreateSocialRequestDto,
  CreateSocialResponseDto,
  DeleteSocialRequestDto,
  UpdateSocialRequestDto,
} from '@wink/activity/dto';
import { AlreadyExistsSocialException, SocialNotFoundException } from '@wink/activity/exception';

@Controller('/admin/activity/social')
@ApiTags('[Admin] Activity [친목]')
export class SocialAdminController {
  constructor(private readonly socialAdminService: SocialAdminService) {}

  @Put()
  @AuthAdminAccount()
  @ApiOperation({ summary: '친목 활동 생성' })
  @ApiProperty({ type: CreateSocialRequestDto })
  @ApiCustomResponse(CreateSocialResponseDto)
  @ApiCustomErrorResponse([...AuthAdminAccountException, AlreadyExistsSocialException])
  async createProject(@Body() request: CreateSocialRequestDto): Promise<CreateSocialResponseDto> {
    return this.socialAdminService.createSocial(request);
  }

  @Patch()
  @AuthAdminAccount()
  @ApiOperation({ summary: '친목 활동 수정' })
  @ApiProperty({ type: UpdateSocialRequestDto })
  @ApiCustomErrorResponse([...AuthAdminAccountException, SocialNotFoundException])
  async updateProject(@Body() request: UpdateSocialRequestDto): Promise<void> {
    return this.socialAdminService.updateSocial(request);
  }

  @Delete()
  @AuthAdminAccount()
  @ApiOperation({ summary: '친목 활동 삭제' })
  @ApiProperty({ type: DeleteSocialRequestDto })
  @ApiCustomErrorResponse([...AuthAdminAccountException, SocialNotFoundException])
  async deleteProject(@Body() request: DeleteSocialRequestDto): Promise<void> {
    return this.socialAdminService.deleteSocial(request);
  }
}
