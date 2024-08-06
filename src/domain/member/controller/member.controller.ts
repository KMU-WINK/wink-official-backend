import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { Member } from '../schema';
import { MemberService } from '../service';
import {
  GetMembersResponseDto,
  UpdateMyAvatarRequestDto,
  UpdateMyAvatarResponseDto,
  UpdateMyInfoRequestDto,
  UpdateMyPasswordRequestDto,
} from '../dto';

import { AuthAccount, AuthAccountException, ReqMember } from '../../auth/guard';
import { WrongPasswordException } from '../../auth/exception';

import { AvatarFilter, AvatarFilterException } from '../util/multer';

import { ApiCustomErrorResponse, ApiCustomResponse } from '../../../common/utils/swagger';

@Controller('/member')
@ApiTags('Member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '부원 목록' })
  @ApiCustomResponse({ type: GetMembersResponseDto, status: HttpStatus.OK })
  async getMembers(): Promise<GetMembersResponseDto> {
    return this.memberService.getMembers();
  }

  @Put('/me/info')
  @HttpCode(HttpStatus.OK)
  @AuthAccount()
  @ApiOperation({ summary: '내 정보 수정' })
  @ApiProperty({ type: UpdateMyInfoRequestDto })
  @ApiCustomResponse({ status: HttpStatus.OK })
  @ApiCustomErrorResponse([...AuthAccountException])
  async updateMyInfo(
    @ReqMember() member: Member,
    @Body() request: UpdateMyInfoRequestDto,
  ): Promise<void> {
    return this.memberService.updateMyInfo(member, request);
  }

  @Patch('/me/password')
  @HttpCode(HttpStatus.OK)
  @AuthAccount()
  @ApiOperation({ summary: '내 비밀번호 수정' })
  @ApiProperty({ type: UpdateMyPasswordRequestDto })
  @ApiCustomResponse({ status: HttpStatus.OK })
  @ApiCustomErrorResponse([...AuthAccountException, WrongPasswordException])
  async updateMyPassword(
    @ReqMember() member: Member,
    @Body() request: UpdateMyPasswordRequestDto,
  ): Promise<void> {
    return this.memberService.updateMyPassword(member, request);
  }

  @Patch('/me/avatar')
  @HttpCode(HttpStatus.OK)
  @AuthAccount()
  @UseInterceptors(FileInterceptor('avatar', { fileFilter: AvatarFilter }))
  @ApiOperation({ summary: '내 프로필 사진 수정' })
  @ApiConsumes('multipart/form-data')
  @ApiProperty({ type: UpdateMyAvatarRequestDto })
  @ApiCustomResponse({ type: UpdateMyAvatarResponseDto, status: HttpStatus.OK })
  @ApiCustomErrorResponse([...AuthAccountException, ...AvatarFilterException])
  async updateMyAvatar(
    @ReqMember() member: Member,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateMyAvatarResponseDto> {
    return this.memberService.updateMyAvatar(member, file);
  }

  @Delete('/me/avatar')
  @HttpCode(HttpStatus.OK)
  @AuthAccount()
  @ApiOperation({ summary: '내 프로필 사진 삭제' })
  @ApiCustomResponse({ status: HttpStatus.OK })
  @ApiCustomErrorResponse([...AuthAccountException])
  async deleteMyAvatar(@ReqMember() member: Member): Promise<void> {
    await this.memberService.deleteMyAvatar(member);
  }
}
