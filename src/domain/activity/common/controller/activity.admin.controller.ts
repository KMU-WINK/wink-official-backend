import { Controller, Post, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthAdminAccount, AuthAdminAccountException } from '@wink/auth/guard';

import { UploadResponseDto } from '@wink/activity/common/dto';
import { ActivityAdminService } from '@wink/activity/service';

import { ApiCustomErrorResponse, ApiCustomResponse } from '@wink/swagger';

@Controller('/admin/activity')
@ApiTags('[Admin] Activity [공통]')
export class ActivityAdminController {
  constructor(private readonly activityAdminService: ActivityAdminService) {}

  @Post('/upload')
  @AuthAdminAccount()
  @ApiOperation({ summary: '업로드' })
  @ApiCustomResponse()
  @ApiCustomErrorResponse([...AuthAdminAccountException])
  async upload(@UploadedFile() file: Express.Multer.File): Promise<UploadResponseDto> {
    return this.activityAdminService.upload(file);
  }
}
