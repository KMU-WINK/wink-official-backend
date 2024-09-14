import { Body, Controller, Delete, Patch, Put } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { SocialAdminService } from '@wink/activity/service';
import { AuthAdminAccount, AuthAdminAccountException, ReqMember } from '@wink/auth/guard';
import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';
import {
  CreateSocialRequestDto,
  CreateSocialResponseDto,
  DeleteSocialRequestDto,
  UpdateSocialRequestDto,
} from '@wink/activity/dto';
import { AlreadyExistsSocialException, SocialNotFoundException } from '@wink/activity/exception';
import { Member } from '@wink/member/schema';

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
  async createProject(
    @ReqMember() member: Member,
    @Body() request: CreateSocialRequestDto,
  ): Promise<CreateSocialResponseDto> {
    return this.socialAdminService.createSocial(member, request);
  }

  @Patch()
  @AuthAdminAccount()
  @ApiOperation({ summary: '친목 활동 수정' })
  @ApiProperty({ type: UpdateSocialRequestDto })
  @ApiCustomErrorResponse([
    ...AuthAdminAccountException,
    SocialNotFoundException,
    AlreadyExistsSocialException,
  ])
  async updateProject(
    @ReqMember() member: Member,
    @Body() request: UpdateSocialRequestDto,
  ): Promise<void> {
    return this.socialAdminService.updateSocial(member, request);
  }

  @Delete()
  @AuthAdminAccount()
  @ApiOperation({ summary: '친목 활동 삭제' })
  @ApiProperty({ type: DeleteSocialRequestDto })
  @ApiCustomErrorResponse([...AuthAdminAccountException, SocialNotFoundException])
  async deleteProject(
    @ReqMember() member: Member,
    @Body() request: DeleteSocialRequestDto,
  ): Promise<void> {
    return this.socialAdminService.deleteSocial(member, request);
  }
}
