import { HttpException } from '@nestjs/common';

export class AlreadyRegisteredByStudentIdException extends HttpException {
  constructor() {
    super('이미 가입된 학번입니다.', 409);
  }
}
