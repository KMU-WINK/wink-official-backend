import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
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

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.getOrThrow<string>('smtp.username'),
      to,
      subject,
      html,
    });
  }
}
