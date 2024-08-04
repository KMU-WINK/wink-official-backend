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
  send: (email: string) => void;
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
      send: (email: string) => {
        this.send(email, subject, html).then((_) => _);
      },
    };
  }

  registerComplete({ name }: { name: string }): EmailTemplateResponse {
    const subject = '[WINK] 회원가입 완료';
    const html = registerCompleteTemplate.replace('{name}', name);

    return {
      send: (email: string) => {
        this.send(email, subject, html).then((_) => _);
      },
    };
  }

  approveAccount({ name }: { name: string }): EmailTemplateResponse {
    const subject = '[WINK] 계정 승인 완료';
    const html = approveAccountTemplate.replace('{name}', name);

    return {
      send: (email: string) => {
        this.send(email, subject, html).then((_) => _);
      },
    };
  }

  refuseAccount({ name }: { name: string }): EmailTemplateResponse {
    const subject = '[WINK] 계정 승인 거부';
    const html = refuseAccountTemplate.replace('{name}', name);

    return {
      send: (email: string) => {
        this.send(email, subject, html).then((_) => _);
      },
    };
  }
}
