import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { WrongPasswordException } from '@wink/auth/exception';
import { AuthAccount, AuthAccountException, ReqMember } from '@wink/auth/guard';

import {
  GetMembersResponseDto,
  UpdateMyAvatarRequestDto,
  UpdateMyAvatarResponseDto,
  UpdateMyInfoRequestDto,
  UpdateMyPasswordRequestDto,
} from '@wink/member/dto';
import { MemberService } from '@wink/member/service';
import { Member } from '@wink/member/schema';
import { AvatarFilter, AvatarFilterException } from '@wink/member/util/multer';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/member')
@ApiTags('Member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({ summary: '부원 목록' })
  @ApiCustomResponse(GetMembersResponseDto)
  async getMembers(): Promise<GetMembersResponseDto> {
    return this.memberService.getMembers();
  }

  @Put('/me/info')
  @AuthAccount()
  @ApiOperation({ summary: '내 정보 수정' })
  @ApiProperty({ type: UpdateMyInfoRequestDto })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([...AuthAccountException])
  async updateMyInfo(
    @ReqMember() member: Member,
    @Body() request: UpdateMyInfoRequestDto,
  ): Promise<void> {
    return this.memberService.updateMyInfo(member, request);
  }

  @Patch('/me/password')
  @AuthAccount()
  @ApiOperation({ summary: '내 비밀번호 수정' })
  @ApiProperty({ type: UpdateMyPasswordRequestDto })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([...AuthAccountException, WrongPasswordException])
  async updateMyPassword(
    @ReqMember() member: Member,
    @Body() request: UpdateMyPasswordRequestDto,
  ): Promise<void> {
    return this.memberService.updateMyPassword(member, request);
  }

  @Patch('/me/avatar')
  @AuthAccount()
  @UseInterceptors(FileInterceptor('avatar', { fileFilter: AvatarFilter }))
  @ApiOperation({ summary: '내 프로필 사진 수정' })
  @ApiConsumes('multipart/form-data')
  @ApiProperty({ type: UpdateMyAvatarRequestDto })
  @ApiCustomResponse(UpdateMyAvatarResponseDto)
  @ApiCustomErrorResponse([...AuthAccountException, ...AvatarFilterException])
  async updateMyAvatar(
    @ReqMember() member: Member,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateMyAvatarResponseDto> {
    return this.memberService.updateMyAvatar(member, file);
  }

  @Delete('/me/avatar')
  @AuthAccount()
  @ApiOperation({ summary: '내 프로필 사진 삭제' })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([...AuthAccountException])
  async deleteMyAvatar(@ReqMember() member: Member): Promise<void> {
    await this.memberService.deleteMyAvatar(member);
  }
}
