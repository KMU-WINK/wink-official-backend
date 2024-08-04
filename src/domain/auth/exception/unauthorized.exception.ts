import { HttpException } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super('승인되지 않은 사용자입니다.', 401);
  }
}
