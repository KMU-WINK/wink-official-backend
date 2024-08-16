import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class InvalidRefreshTokenException extends ApiException {
  constructor() {
    super({
      swagger: '잘못된 리프레시 토큰일 때',
      message: '올바르지 않은 리프레시 토큰입니다.',
      code: HttpStatus.UNAUTHORIZED,
    });
  }
}
