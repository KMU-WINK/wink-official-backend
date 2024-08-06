import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

import * as nodemailer from 'nodemailer';

import { EmailTemplateBase } from './template';

import { MailSendEvent, MailTemplateSendEvent } from '../event';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {
    this.transporter = nodemailer.createTransport({
      host: configService.getOrThrow<string>('smtp.host'),
      port: configService.getOrThrow<number>('smtp.port'),
      secure: configService.getOrThrow<boolean>('smtp.secure'),
      auth: {
        user: configService.getOrThrow<string>('smtp.username'),
        pass: configService.getOrThrow<string>('smtp.password'),
      },
    });
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: `WINK <${this.configService.getOrThrow<string>('smtp.username')}>`,
      to,
      subject,
      html,
    });

    this.eventEmitter.emit(MailSendEvent.EVENT_NAME, new MailSendEvent(to, subject, html));
  }

  async sendTemplate(to: string, template: EmailTemplateBase): Promise<void> {
    await this.send(to, template.subject(), template.html());

    this.eventEmitter.emit(
      MailTemplateSendEvent.EVENT_NAME,
      new MailTemplateSendEvent(to, template),
    );
  }
}
