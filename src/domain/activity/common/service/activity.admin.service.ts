import { Inject, Injectable } from '@nestjs/common';

import { MemberRepository } from '@wink/member/repository';

import { UploadResponseDto } from '@wink/activity/common/dto';

import { S3Service } from '@wink/s3';

@Injectable()
export class ActivityAdminService {
  constructor(
    private readonly memberRepository: MemberRepository,
    @Inject('S3_SERVICE_ACTIVITY') private readonly avatarService: S3Service,
  ) {}

  async upload(file: Express.Multer.File): Promise<UploadResponseDto> {
    const link = await this.avatarService.upload(file);

    return { link };
  }
}
