import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MailSendEvent } from '../../type';

@Injectable()
export class MailEventListener {
  private readonly logger = new Logger(MailEventListener.name);

  @OnEvent(MailSendEvent.EVENT_NAME)
  onSend({ to, subject }: MailSendEvent) {
    this.logger.log(`Send mail to ${to} with subject ${subject}`);
  }
}
