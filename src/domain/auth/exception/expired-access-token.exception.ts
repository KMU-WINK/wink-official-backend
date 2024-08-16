import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class ExpiredAccessTokenException extends ApiException {
  constructor() {
    super({
      swagger: '접근 토큰이 만료되었을 때',
      message: '접근 토큰이 만료되었습니다.',
      code: HttpStatus.UNAUTHORIZED,
    });
  }
}
