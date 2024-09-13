import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class AlreadyExistsStudyException extends ApiException {
  constructor() {
    super({
      swagger: '스터디가 이미 존재하는 경우',
      message: '스터디가 이미 존재합니다.',
      code: HttpStatus.CONFLICT,
    });
  }
}
