import { EmailTemplateBase } from '@wink/mail';

export class RejectAccountTemplate implements EmailTemplateBase {
  constructor(private readonly name: string) {}

  subject(): string {
    return '[WINK] 회원가입 거부';
  }

  html(): string {
    return `
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;">
          <img src="https://avatars.githubusercontent.com/u/69004745" alt="Logo" style="max-width: 150px;">
        </div>
        <div style="padding: 20px; text-align: center;">
          <h1 style="color: #333333;">회원가입 거부</h1>
          <p style="font-size: 16px; color: #666666; line-height: 1.5;">안녕하세요, ${this.name}님</p>
          <p style="font-size: 16px; color: #666666; line-height: 1.5;">죄송합니다만, 회원가입 요청이 거부되었습니다.</p>
        </div>
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #999999;">
          &copy; 2024 Wink. All rights reserved.
        </div>
      </div>
    `;
  }
}
