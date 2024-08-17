import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class AlreadyRegisteredByStudentIdException extends ApiException {
  constructor() {
    super({
      swagger: '이미 가입된 학번일 때',
      message: '이미 가입된 학번입니다.',
      code: HttpStatus.CONFLICT,
    });
  }
}
