import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { Member } from './member.schema';
import { MemberService } from './member.service';
import {
  GetMembersResponseDto,
  UpdateMyAvatarRequestDto,
  UpdateMyAvatarResponseDto,
  UpdateMyInfoRequestDto,
  UpdateMyPasswordRequestDto,
} from './dto';

import { AuthMemberAccount, ReqMember } from '../auth/auth.guard';
import {
  WrongPasswordException,
  UnauthorizedException,
  PermissionException,
} from '../auth/exception';

import { AvatarFilter } from './util';
import { ApiCustomErrorResponse, ApiCustomResponse } from '../../utils';

@Controller('/member')
@ApiTags('Member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @HttpCode(201)
  @ApiOperation({ summary: '부원 목록' })
  @ApiCustomResponse({ type: GetMembersResponseDto, status: 201 })
  async getMembers(): Promise<GetMembersResponseDto> {
    const members = await this.memberService.getMembers();

    return { members };
  }

  @Put('/me/info')
  @HttpCode(200)
  @AuthMemberAccount()
  @ApiOperation({ summary: '내 정보 수정' })
  @ApiProperty({ type: UpdateMyInfoRequestDto })
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
  ])
  async updateMyInfo(
    @ReqMember() member: Member,
    @Body() request: UpdateMyInfoRequestDto,
  ): Promise<void> {
    const { description, github, instagram, blog } = request;

    await this.memberService.updateMyInfo(member, description, github, instagram, blog);
  }

  @Patch('/me/password')
  @HttpCode(200)
  @AuthMemberAccount()
  @ApiOperation({ summary: '내 비밀번호 수정' })
  @ApiProperty({ type: UpdateMyPasswordRequestDto })
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
      description: '기존 비밀번호가 틀림',
      error: WrongPasswordException,
    },
  ])
  async updateMyPassword(
    @ReqMember() member: Member,
    @Body() request: UpdateMyPasswordRequestDto,
  ): Promise<void> {
    const { password, newPassword } = request;

    await this.memberService.updateMyPassword(member, password, newPassword);
  }

  @Patch('/me/avatar')
  @HttpCode(200)
  @AuthMemberAccount()
  @UseInterceptors(FileInterceptor('avatar', { fileFilter: AvatarFilter }))
  @ApiOperation({ summary: '내 프로필 사진 수정' })
  @ApiConsumes('multipart/form-data')
  @ApiProperty({ type: UpdateMyAvatarRequestDto })
  @ApiCustomResponse({ type: UpdateMyAvatarResponseDto, status: 200 })
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
  async updateMyAvatar(
    @ReqMember() member: Member,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateMyAvatarResponseDto> {
    const avatar = await this.memberService.updateMyAvatar(member, file);

    return { avatar };
  }
}
