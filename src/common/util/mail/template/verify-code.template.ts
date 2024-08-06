import { EmailTemplateBase } from './email-template.base';

export class VerifyCodeTemplate implements EmailTemplateBase {
  constructor(
    private readonly email: string,
    private readonly code: string,
  ) {}

  subject(): string {
    return '[WINK] 인증코드';
  }

  html(): string {
    return `
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;">
          <img src="https://avatars.githubusercontent.com/u/69004745" alt="Logo" style="max-width: 150px;">
        </div>
        <div style="padding: 20px; text-align: center;">
          <h1 style="color: #333333;">이메일 인증</h1>
          <p style="font-size: 16px; color: #666666; line-height: 1.5;">안녕하세요, ${this.email}님</p>
          <p style="font-size: 16px; color: #666666; line-height: 1.5;">회원가입을 계속 하시려면 아래 인증번호를 입력해 주세요:</p>
          <div style="display: inline-block; font-size: 22px; color: #ffffff; background-color: #007BFF; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 20px;">${this.code}</div>
        </div>
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #999999;">
          &copy; 2024 Wink. All rights reserved.
        </div>
      </div>
    `;
  }
}
