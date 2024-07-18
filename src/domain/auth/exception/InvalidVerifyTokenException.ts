import { HttpException } from '@nestjs/common';

export class InvalidVerifyTokenException extends HttpException {
  constructor() {
    super('올바르지 않은 인증 토큰입니다.', 400);
  }
}
