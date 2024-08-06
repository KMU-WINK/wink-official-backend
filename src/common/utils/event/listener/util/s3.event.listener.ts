import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { S3DeleteEvent, S3UploadEvent } from '../../type';

@Injectable()
export class S3EventListener {
  private readonly logger = new Logger(S3EventListener.name);

  @OnEvent(S3UploadEvent.EVENT_NAME)
  onSet({ key }: S3UploadEvent) {
    this.logger.log(`S3UploadEvent: { key: ${key} }`);
  }

  @OnEvent(S3DeleteEvent.EVENT_NAME)
  onSetTtl({ key }: S3DeleteEvent) {
    this.logger.log(`S3DeleteEvent: { key: ${key} }`);
  }
}
