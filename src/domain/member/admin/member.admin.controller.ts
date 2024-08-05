import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { MemberAdminService } from './member.admin.service';
import {
  ApproveWaitingMemberRequestDto,
  GetMembersForAdminResponseDto,
  GetWaitingMembersResponseDto,
  RejectWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
} from '../dto';
import { NotApprovedMemberException, NotWaitingMemberException } from '../exception';

import { AuthAdminAccount } from '../../auth/auth.guard';
import { UnauthorizedException, PermissionException } from '../../auth/exception';

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
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
    {
      description: '권한이 없는 사용자',
      error: PermissionException,
    },
  ])
  async getWaitingMembers(): Promise<GetWaitingMembersResponseDto> {
    const members = await this.memberAdminService.getWaitingMembers();

    return { members };
  }

  @Post('/waiting/approve')
  @HttpCode(200)
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 승인' })
  @ApiProperty({ type: ApproveWaitingMemberRequestDto })
  @ApiCustomResponse({ status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
    {
      description: '권한이 없는 사용자',
      error: PermissionException,
    },
    {
      description: '대기 중인 회원이 아님',
      error: NotWaitingMemberException,
    },
  ])
  async approveWaitingMember(@Body() request: ApproveWaitingMemberRequestDto): Promise<void> {
    const { memberId } = request;

    await this.memberAdminService.approveWaitingMember(memberId);
  }

  @Post('/waiting/reject')
  @HttpCode(200)
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 거부' })
  @ApiProperty({ type: RejectWaitingMemberRequestDto })
  @ApiCustomResponse({ status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
    {
      description: '권한이 없는 사용자',
      error: PermissionException,
    },
    {
      description: '대기 중인 회원이 아님',
      error: NotWaitingMemberException,
    },
  ])
  async rejectWaitingMember(@Body() request: RejectWaitingMemberRequestDto): Promise<void> {
    const { memberId } = request;

    await this.memberAdminService.rejectWaitingMember(memberId);
  }

  @Get()
  @HttpCode(201)
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 목록' })
  @ApiCustomResponse({ type: GetMembersForAdminResponseDto, status: 201 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
    {
      description: '권한이 없는 사용자',
      error: PermissionException,
    },
  ])
  async getMembers(): Promise<GetMembersForAdminResponseDto> {
    const members = await this.memberAdminService.getMembers();

    return { members };
  }

  @Patch('/role')
  @HttpCode(200)
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 권한 수정' })
  @ApiProperty({ type: UpdateMemberRoleRequestDto })
  @ApiCustomResponse({ status: 201 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
    {
      description: '권한이 없는 사용자',
      error: PermissionException,
    },
    {
      description: '승인되지 않은 회원',
      error: NotApprovedMemberException,
    },
  ])
  async updateMemberRole(@Body() request: UpdateMemberRoleRequestDto): Promise<void> {
    const { memberId, role } = request;

    await this.memberAdminService.updateRole(memberId, role);
  }

  @Patch('/fee')
  @HttpCode(200)
  @AuthAdminAccount()
  @ApiOperation({ summary: '부원 회비 납부 여부 수정' })
  @ApiProperty({ type: UpdateMemberFeeRequestDto })
  @ApiCustomResponse({ status: 201 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
    {
      description: '권한이 없는 사용자',
      error: PermissionException,
    },
    {
      description: '승인되지 않은 회원',
      error: NotApprovedMemberException,
    },
  ])
  async updateMemberFee(@Body() request: UpdateMemberFeeRequestDto): Promise<void> {
    const { memberId, fee } = request;

    await this.memberAdminService.updateFee(memberId, fee);
  }
}
