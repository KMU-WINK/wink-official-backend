import { HttpException } from '@nestjs/common';

export class InvalidVerifyCodeException extends HttpException {
  constructor() {
    super('인증코드가 일치하지 않습니다.', 400);
  }
}
