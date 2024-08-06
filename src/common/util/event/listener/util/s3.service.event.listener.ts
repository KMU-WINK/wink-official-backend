import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { S3DeleteEvent, S3UploadEvent } from '../../type';

@Injectable()
export class S3ServiceEventListener {
  private readonly logger = new Logger(S3ServiceEventListener.name);

  @OnEvent(S3UploadEvent.EVENT_NAME)
  onS3Upload({ key }: S3UploadEvent) {
    this.logger.log(`Upload file (${key})`);
  }

  @OnEvent(S3DeleteEvent.EVENT_NAME)
  onS3Delete({ key }: S3DeleteEvent) {
    this.logger.log(`Delete file (${key})`);
  }
}
