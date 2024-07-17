import { HttpException } from '@nestjs/common';

export class AlreadyRegisteredByEmailException extends HttpException {
  constructor() {
    super('이미 가입된 이메일입니다.', 409);
  }
}
