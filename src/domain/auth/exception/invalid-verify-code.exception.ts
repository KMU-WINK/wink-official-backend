import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../../../common/utils/swagger';

export class InvalidVerifyCodeException extends ApiException {
  constructor() {
    super({
      swagger: '잘못된 인증 코드일 때',
      message: '올바르지 않은 인증 코드입니다.',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
