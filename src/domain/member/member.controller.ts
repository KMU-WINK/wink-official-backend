/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { MemberService } from './member.service';

import { AuthMemberAccount } from '../auth/auth.guard';

import {
  GetMembersResponseDto,
  UpdateMyAvatarRequestDto,
  UpdateMyAvatarResponseDto,
  UpdateMyInfoRequestDto,
  UpdateMyPasswordRequestDto,
} from './dto';
import { ApiCustomErrorResponse, ApiCustomResponse } from '../../utils';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/member')
@ApiTags('Member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @HttpCode(201)
  @ApiOperation({ summary: '부원 목록' })
  @ApiCustomResponse({ type: GetMembersResponseDto, status: 201 })
  async getMembers(): Promise<GetMembersResponseDto> {
    return { members: [] };
  }

  @Patch('/me/info')
  @HttpCode(200)
  @ApiOperation({ summary: '내 정보 수정' })
  @ApiProperty({ type: UpdateMyInfoRequestDto })
  @ApiCustomResponse({ status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  @AuthMemberAccount()
  async updateMyInfo(@Body() request: UpdateMyInfoRequestDto): Promise<void> {
    return;
  }

  @Patch('/me/password')
  @HttpCode(200)
  @ApiOperation({ summary: '내 비밀번호 수정' })
  @ApiProperty({ type: UpdateMyPasswordRequestDto })
  @ApiCustomResponse({ status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  @AuthMemberAccount()
  async updateMyPassword(@Body() request: UpdateMyPasswordRequestDto): Promise<void> {
    return;
  }

  @Patch('/me/avatar')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({ summary: '내 아바타 수정' })
  @ApiConsumes('multipart/form-data')
  @ApiProperty({ type: UpdateMyAvatarRequestDto })
  @ApiCustomResponse({ type: UpdateMyAvatarResponseDto, status: 200 })
  @ApiCustomErrorResponse([
    {
      description: '인증되지 않은 사용자',
      error: UnauthorizedException,
    },
  ])
  @AuthMemberAccount()
  async updateMyAvatar(
    @UploadedFile() avatar: Express.MulterS3.File,
  ): Promise<UpdateMyAvatarResponseDto> {
    return { avatar: null };
  }
}
