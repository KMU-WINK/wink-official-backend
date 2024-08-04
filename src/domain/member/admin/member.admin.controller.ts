import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { MemberAdminService } from './member.admin.service';

import {
  ApproveWaitingMemberRequestDto,
  GetMembersForAdminResponseDto,
  GetWaitingMembersResponseDto,
  RefuseWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
} from '../dto';

import { NotApprovedMemberException, NotWaitingMemberException } from '../exception';

import { AuthAdminAccount } from '../../auth/auth.guard';
import { ApiCustomErrorResponse, ApiCustomResponse } from '../../../utils';

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
      error: ForbiddenException,
    },
  ])
  async getWaitingMembers(): Promise<GetWaitingMembersResponseDto> {
    const members = await this.memberAdminService.getWaitingMembers();

    return { members };
  }

  @Patch('/waiting')
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
      error: ForbiddenException,
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

  @Delete('/waiting')
  @HttpCode(200)
  @AuthAdminAccount()
  @ApiOperation({ summary: '회원가입 거절' })
  @ApiProperty({ type: RefuseWaitingMemberRequestDto })
  @ApiCustomResponse({ status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
    {
      description: '권한이 없는 사용자',
      error: ForbiddenException,
    },
    {
      description: '대기 중인 회원이 아님',
      error: NotWaitingMemberException,
    },
  ])
  async refuseWaitingMember(@Body() request: RefuseWaitingMemberRequestDto): Promise<void> {
    const { memberId } = request;

    await this.memberAdminService.refuseWaitingMember(memberId);
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
      error: ForbiddenException,
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
      error: ForbiddenException,
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
      error: ForbiddenException,
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
