/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { MemberService } from './member.service';

import { AuthAdminAccount } from '../auth/auth.guard';

import {
  ApproveWaitingMemberRequestDto,
  GetMembersForAdminResponseDto,
  GetWaitingMembersResponseDto,
  RefuseWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
} from './dto';
import { ApiCustomErrorResponse, ApiCustomResponse } from '../../utils';

@Controller('/admin/member')
@ApiTags('[Admin] Member')
export class MemberAdminController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/waiting')
  @HttpCode(201)
  @ApiOperation({ summary: '회원가입 승인 대기 목록' })
  @ApiCustomResponse({ type: GetWaitingMembersResponseDto, status: 201 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  @AuthAdminAccount()
  async getWaitingMembers(): Promise<GetMembersForAdminResponseDto> {
    return { members: [] };
  }

  @Patch('/waiting')
  @HttpCode(200)
  @ApiOperation({ summary: '회원가입 승인' })
  @ApiProperty({ type: ApproveWaitingMemberRequestDto })
  @ApiCustomResponse({ status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  @AuthAdminAccount()
  async approveWaitingMember(@Body() request: ApproveWaitingMemberRequestDto): Promise<any> {
    return {};
  }

  @Delete('/waiting')
  @HttpCode(200)
  @ApiOperation({ summary: '회원가입 거절' })
  @ApiCustomResponse({ status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  @AuthAdminAccount()
  async refuseWaitingMember(@Body() request: RefuseWaitingMemberRequestDto): Promise<any> {
    return {};
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: '부원 목록' })
  @ApiCustomResponse({ type: GetMembersForAdminResponseDto, status: 201 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  @AuthAdminAccount()
  async getMembers(): Promise<any> {
    return {};
  }

  @Patch('/role')
  @HttpCode(200)
  @ApiOperation({ summary: '부원 권한 수정' })
  @ApiCustomResponse({ type: UpdateMemberRoleRequestDto, status: 201 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  @AuthAdminAccount()
  async updateMemberRole(@Body() request: UpdateMemberRoleRequestDto): Promise<any> {
    return {};
  }

  @Patch('/fee')
  @HttpCode(200)
  @ApiOperation({ summary: '부원 회비 납부 여부 수정' })
  @ApiCustomResponse({ type: UpdateMemberFeeRequestDto, status: 201 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  @AuthAdminAccount()
  async updateMemberFee(@Body() request: UpdateMemberFeeRequestDto): Promise<any> {
    return {};
  }
}
