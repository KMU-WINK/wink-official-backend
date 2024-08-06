import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { MemberAdminService } from '../service';
import {
  ApproveWaitingMemberRequestDto,
  GetMembersForAdminResponseDto,
  GetWaitingMembersResponseDto,
  RejectWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
} from '../dto';
import { NotApprovedMemberException, NotWaitingMemberException } from '../exception';

import { AuthAdminAccount, AuthAdminAccountException, ReqMember } from '../../auth/guard';

import { ApiCustomErrorResponse, ApiCustomResponse } from '../../../common/utils/swagger';
import { Member } from '../schema';
import { SuperRoleException } from '../../auth/exception';

@Controller('/admin/member')
@ApiTags('[Admin] Member')
export class MemberAdminController {
  constructor(private readonly memberAdminService: MemberAdminService) {}

  @Get('/waiting')
  @HttpCode(HttpStatus.OK)
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 승인 대기 목록' })
  @ApiCustomResponse({ type: GetWaitingMembersResponseDto, status: HttpStatus.OK })
  @ApiCustomErrorResponse([...AuthAdminAccountException])
  async getWaitingMembers(): Promise<GetWaitingMembersResponseDto> {
    return this.memberAdminService.getWaitingMembers();
  }

  @Post('/waiting/approve')
  @HttpCode(HttpStatus.OK)
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 승인' })
  @ApiProperty({ type: ApproveWaitingMemberRequestDto })
  @ApiCustomResponse({ status: HttpStatus.OK })
  @ApiCustomErrorResponse([...AuthAdminAccountException, NotWaitingMemberException])
  async approveWaitingMember(
    @ReqMember() member: Member,
    @Body() request: ApproveWaitingMemberRequestDto,
  ): Promise<void> {
    return this.memberAdminService.approveWaitingMember(member, request);
  }

  @Post('/waiting/reject')
  @HttpCode(HttpStatus.OK)
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 거부' })
  @ApiProperty({ type: RejectWaitingMemberRequestDto })
  @ApiCustomResponse({ status: HttpStatus.OK })
  @ApiCustomErrorResponse([...AuthAdminAccountException, NotWaitingMemberException])
  async rejectWaitingMember(
    @ReqMember() member: Member,
    @Body() request: RejectWaitingMemberRequestDto,
  ): Promise<void> {
    return this.memberAdminService.rejectWaitingMember(member, request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 목록' })
  @ApiCustomResponse({ type: GetMembersForAdminResponseDto, status: HttpStatus.OK })
  @ApiCustomErrorResponse([...AuthAdminAccountException])
  async getMembers(): Promise<GetMembersForAdminResponseDto> {
    return this.memberAdminService.getMembers();
  }

  @Patch('/role')
  @HttpCode(HttpStatus.OK)
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 권한 수정' })
  @ApiProperty({ type: UpdateMemberRoleRequestDto })
  @ApiCustomResponse({ status: HttpStatus.OK })
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
  @HttpCode(HttpStatus.OK)
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 회비 납부 여부 수정' })
  @ApiProperty({ type: UpdateMemberFeeRequestDto })
  @ApiCustomResponse({ status: HttpStatus.OK })
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
