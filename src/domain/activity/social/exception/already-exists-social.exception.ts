import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class AlreadyExistsSocialException extends ApiException {
  constructor() {
    super({
      swagger: '친목 활동이 이미 존재하는 경우',
      message: '친목 활동이 이미 존재합니다.',
      code: HttpStatus.CONFLICT,
    });
  }
}
