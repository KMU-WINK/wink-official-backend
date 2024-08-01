import { HttpException } from '@nestjs/common';

export class WrongPasswordException extends HttpException {
  constructor() {
    super('잘못된 비밀번호입니다.', 400);
  }
}
