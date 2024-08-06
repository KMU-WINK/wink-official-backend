import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
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

import { AuthAdminAccount, AuthAdminAccountException } from '../../auth/guard';

import { ApiCustomErrorResponse, ApiCustomResponse } from '../../../common/utils/swagger';

@Controller('/admin/member')
@ApiTags('[Admin] Member')
export class MemberAdminController {
  constructor(private readonly memberAdminService: MemberAdminService) {}

  @Get('/waiting')
  @HttpCode(201)
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 승인 대기 목록' })
  @ApiCustomResponse({ type: GetWaitingMembersResponseDto, status: 201 })
  @ApiCustomErrorResponse([...AuthAdminAccountException])
  async getWaitingMembers(): Promise<GetWaitingMembersResponseDto> {
    return this.memberAdminService.getWaitingMembers();
  }

  @Post('/waiting/approve')
  @HttpCode(200)
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 승인' })
  @ApiProperty({ type: ApproveWaitingMemberRequestDto })
  @ApiCustomResponse({ status: 200 })
  @ApiCustomErrorResponse([
    ...AuthAdminAccountException,
    {
      description: '멤버가 이미 승인됨',
      error: NotWaitingMemberException,
    },
  ])
  async approveWaitingMember(@Body() request: ApproveWaitingMemberRequestDto): Promise<void> {
    return this.memberAdminService.approveWaitingMember(request);
  }

  @Post('/waiting/reject')
  @HttpCode(200)
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 거부' })
  @ApiProperty({ type: RejectWaitingMemberRequestDto })
  @ApiCustomResponse({ status: 200 })
  @ApiCustomErrorResponse([
    ...AuthAdminAccountException,
    {
      description: '멤버가 이미 승인됨',
      error: NotWaitingMemberException,
    },
  ])
  async rejectWaitingMember(@Body() request: RejectWaitingMemberRequestDto): Promise<void> {
    return this.memberAdminService.rejectWaitingMember(request);
  }

  @Get()
  @HttpCode(201)
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 목록' })
  @ApiCustomResponse({ type: GetMembersForAdminResponseDto, status: 201 })
  @ApiCustomErrorResponse([...AuthAdminAccountException])
  async getMembers(): Promise<GetMembersForAdminResponseDto> {
    return this.memberAdminService.getMembers();
  }

  @Patch('/role')
  @HttpCode(200)
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 권한 수정' })
  @ApiProperty({ type: UpdateMemberRoleRequestDto })
  @ApiCustomResponse({ status: 201 })
  @ApiCustomErrorResponse([
    ...AuthAdminAccountException,
    {
      description: '멤버가 승인되지 않음',
      error: NotApprovedMemberException,
    },
  ])
  async updateMemberRole(@Body() request: UpdateMemberRoleRequestDto): Promise<void> {
    return this.memberAdminService.updateRole(request);
  }

  @Patch('/fee')
  @HttpCode(200)
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 회비 납부 여부 수정' })
  @ApiProperty({ type: UpdateMemberFeeRequestDto })
  @ApiCustomResponse({ status: 201 })
  @ApiCustomErrorResponse([
    ...AuthAdminAccountException,
    {
      description: '멤버가 승인되지 않음',
      error: NotApprovedMemberException,
    },
  ])
  async updateMemberFee(@Body() request: UpdateMemberFeeRequestDto): Promise<void> {
    return this.memberAdminService.updateFee(request);
  }
}
