import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class InvalidVerifyTokenException extends ApiException {
  constructor() {
    super({
      swagger: '잘못된 인증 토큰일 때',
      message: '올바르지 않은 인증 토큰입니다.',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
