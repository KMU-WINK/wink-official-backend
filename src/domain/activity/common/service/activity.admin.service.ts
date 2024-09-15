import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { MemberRepository } from '@wink/member/repository';
import { Member } from '@wink/member/schema';

import { UploadResponseDto } from '@wink/activity/common/dto';

import { S3Service } from '@wink/s3';
import { UploadEvent } from '@wink/event';

@Injectable()
export class ActivityAdminService {
  constructor(
    private readonly memberRepository: MemberRepository,

    @Inject('S3_SERVICE_ACTIVITY') private readonly activityService: S3Service,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async upload(member: Member, file: Express.Multer.File): Promise<UploadResponseDto> {
    const link = await this.activityService.upload(file);

    this.eventEmitter.emit(UploadEvent.EVENT_NAME, new UploadEvent(member, file));

    return { link };
  }
}
