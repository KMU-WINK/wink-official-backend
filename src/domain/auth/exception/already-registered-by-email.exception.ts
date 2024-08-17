import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class AlreadyRegisteredByEmailException extends ApiException {
  constructor() {
    super({
      swagger: '이미 가입된 메일일 때',
      message: '이미 가입된 이메일입니다.',
      code: HttpStatus.CONFLICT,
    });
  }
}
