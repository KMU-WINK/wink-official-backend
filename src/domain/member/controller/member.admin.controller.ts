import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { SuperRoleException } from '@wink/auth/exception';
import { AuthAdminAccount, AuthAdminAccountException, ReqMember } from '@wink/auth/guard';

import {
  ApproveWaitingMemberRequestDto,
  GetMembersForAdminResponseDto,
  GetWaitingMembersResponseDto,
  RejectWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
} from '@wink/member/dto';
import { NotApprovedMemberException, NotWaitingMemberException } from '@wink/member/exception';
import { Member } from '@wink/member/schema';
import { MemberAdminService } from '@wink/member/service';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/admin/member')
@ApiTags('[Admin] Member')
export class MemberAdminController {
  constructor(private readonly memberAdminService: MemberAdminService) {}

  @Get('/waiting')
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 승인 대기 목록' })
  @ApiCustomResponse(GetWaitingMembersResponseDto)
  @ApiCustomErrorResponse([...AuthAdminAccountException])
  async getWaitingMembers(): Promise<GetWaitingMembersResponseDto> {
    return this.memberAdminService.getWaitingMembers();
  }

  @Post('/waiting/approve')
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 승인' })
  @ApiProperty({ type: ApproveWaitingMemberRequestDto })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([...AuthAdminAccountException, NotWaitingMemberException])
  async approveWaitingMember(
    @ReqMember() member: Member,
    @Body() request: ApproveWaitingMemberRequestDto,
  ): Promise<void> {
    return this.memberAdminService.approveWaitingMember(member, request);
  }

  @Post('/waiting/reject')
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 거부' })
  @ApiProperty({ type: RejectWaitingMemberRequestDto })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([...AuthAdminAccountException, NotWaitingMemberException])
  async rejectWaitingMember(
    @ReqMember() member: Member,
    @Body() request: RejectWaitingMemberRequestDto,
  ): Promise<void> {
    return this.memberAdminService.rejectWaitingMember(member, request);
  }

  @Get()
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 목록' })
  @ApiCustomResponse(GetMembersForAdminResponseDto)
  @ApiCustomErrorResponse([...AuthAdminAccountException])
  async getMembers(): Promise<GetMembersForAdminResponseDto> {
    return this.memberAdminService.getMembers();
  }

  @Patch('/role')
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 권한 수정' })
  @ApiProperty({ type: UpdateMemberRoleRequestDto })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([
    ...AuthAdminAccountException,
    NotApprovedMemberException,
    SuperRoleException,
  ])
  async updateMemberRole(
    @ReqMember() member: Member,
    @Body() request: UpdateMemberRoleRequestDto,
  ): Promise<void> {
    return this.memberAdminService.updateRole(member, request);
  }

  @Patch('/fee')
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 회비 납부 여부 수정' })
  @ApiProperty({ type: UpdateMemberFeeRequestDto })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([
    ...AuthAdminAccountException,
    NotApprovedMemberException,
    SuperRoleException,
  ])
  async updateMemberFee(
    @ReqMember() member: Member,
    @Body() request: UpdateMemberFeeRequestDto,
  ): Promise<void> {
    return this.memberAdminService.updateFee(member, request);
  }
}
