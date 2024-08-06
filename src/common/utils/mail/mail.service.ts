import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';

import { EmailTemplateBase } from './template';

@Injectable()
export class MailService {
  private readonly logger: Logger = new Logger(MailService.name);

  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
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

    this.logger.log(`Send to ${to} with subject: ${subject}`);
  }

  async sendTemplate(to: string, template: EmailTemplateBase): Promise<void> {
    await this.send(to, template.subject(), template.html());
  }
}
