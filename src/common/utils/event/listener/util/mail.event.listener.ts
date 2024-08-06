import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MailSendEvent, MailTemplateSendEvent } from '../../type';

@Injectable()
export class MailEventListener {
  private readonly logger = new Logger(MailEventListener.name);

  @OnEvent(MailSendEvent.EVENT_NAME)
  onSend({ to, subject }: MailSendEvent) {
    this.logger.log(`MailSendEvent: { to: ${to}, subject: ${subject} }`);
  }

  @OnEvent(MailTemplateSendEvent.EVENT_NAME)
  onTemplateSend({ to, template }: MailTemplateSendEvent) {
    this.logger.log(
      `MailTemplateSendEvent: { to: ${to}, subject: ${template.subject()}, template: ${template.constructor.name} }`,
    );
  }
}
