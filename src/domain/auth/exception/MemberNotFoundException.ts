import { HttpException } from '@nestjs/common';

export class MemberNotFoundException extends HttpException {
  constructor() {
    super('가입되지 않은 회원입니다.', 404);
  }
}
