import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthAdminAccount, AuthAdminAccountException, ReqMember } from '@wink/auth/guard';

import { Member } from '@wink/member/schema';

import { UploadResponseDto } from '@wink/activity/common/dto';
import { ImageFilter, ImageFilterException } from '@wink/activity/common/util/multer';
import { ActivityAdminService } from '@wink/activity/service';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/admin/activity')
@ApiTags('[Admin] Activity [공통]')
export class ActivityAdminController {
  constructor(private readonly activityAdminService: ActivityAdminService) {}

  @Post('/upload')
  @AuthAdminAccount()
  @UseInterceptors(FileInterceptor('image', { fileFilter: ImageFilter }))
  @ApiOperation({ summary: '사진 업로드' })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([...AuthAdminAccountException, ...ImageFilterException])
  async upload(
    @ReqMember() member: Member,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    return this.activityAdminService.upload(member, file);
  }
}
