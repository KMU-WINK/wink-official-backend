import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PurgeUnusedAvatarEvent, PurgeUnusedImageEvent } from '../../type';

@Injectable()
export class SchedulerEventListener {
  private readonly logger = new Logger(SchedulerEventListener.name);

  @OnEvent(PurgeUnusedAvatarEvent.EVENT_NAME)
  onPurgeUnusedAvatar({ keys }: PurgeUnusedAvatarEvent) {
    this.logger.log(`Purge unused ${keys.length} avatars.`);
  }

  @OnEvent(PurgeUnusedImageEvent.EVENT_NAME)
  onPurgeUnusedImage({ keys }: PurgeUnusedImageEvent) {
    this.logger.log(`Purge unused ${keys.length} images.`);
  }
}
