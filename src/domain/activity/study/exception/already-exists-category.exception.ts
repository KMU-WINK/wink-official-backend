import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class AlreadyExistsCategoryException extends ApiException {
  constructor() {
    super({
      swagger: '카테고리가 이미 존재하는 경우',
      message: '카테고리가 이미 존재합니다.',
      code: HttpStatus.CONFLICT,
    });
  }
}
