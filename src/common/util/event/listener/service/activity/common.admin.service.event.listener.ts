import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UploadEvent } from '../../../type';

@Injectable()
export class CommonAdminServiceEventListener {
  private readonly logger = new Logger(CommonAdminServiceEventListener.name);

  @OnEvent(UploadEvent.EVENT_NAME)
  onUpload({ member, file }: UploadEvent) {
    this.logger.log(`Upload file from ${member.name} (file: ${file.path})`);
  }
}
