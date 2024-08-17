import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class WrongPasswordException extends ApiException {
  constructor() {
    super({
      swagger: '비밀번호가 틀렸을 때',
      message: '잘못된 비밀번호입니다.',
      code: HttpStatus.UNAUTHORIZED,
    });
  }
}
