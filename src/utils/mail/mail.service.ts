import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  approveAccountTemplate,
  refuseAccountTemplate,
  registerCompleteTemplate,
  verifyCodeTemplate,
} from './template';

import * as nodemailer from 'nodemailer';

interface EmailTemplateResponse {
  send: (email: string) => Promise<void>;
}

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

  async send(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.getOrThrow<string>('smtp.username'),
      to,
      subject,
      html,
    });
  }

  verifyCode({ email, code }: { email: string; code: string }): EmailTemplateResponse {
    const subject = '[WINK] 회원가입 인증코드';
    const html = verifyCodeTemplate.replace('{email}', email).replace('{code}', code);

    return {
      send: async (email: string) => {
        await this.send(email, subject, html);
      },
    };
  }

  registerComplete({ name }: { name: string }): EmailTemplateResponse {
    const subject = '[WINK] 회원가입 완료';
    const html = registerCompleteTemplate.replace('{name}', name);

    return {
      send: async (email: string) => {
        await this.send(email, subject, html);
      },
    };
  }

  approveAccount({ name }: { name: string }): EmailTemplateResponse {
    const subject = '[WINK] 계정 승인 완료';
    const html = approveAccountTemplate.replace('{name}', name);

    return {
      send: async (email: string) => {
        await this.send(email, subject, html);
      },
    };
  }

  refuseAccount({ name }: { name: string }): EmailTemplateResponse {
    const subject = '[WINK] 계정 승인 거부';
    const html = refuseAccountTemplate.replace('{name}', name);

    return {
      send: async (email: string) => {
        await this.send(email, subject, html);
      },
    };
  }
}
