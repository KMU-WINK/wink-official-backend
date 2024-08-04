import { verifyCodeTemplate } from './template';

export class EmailTemplate {
  static verifyCode(email: string, verificationCode: string): string {
    return verifyCodeTemplate
      .replace('{email}', email)
      .replace('{verification_code}', verificationCode);
  }
}
