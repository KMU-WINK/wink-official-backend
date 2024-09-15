import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class AlreadyExistsProjectException extends ApiException {
  constructor() {
    super({
      swagger: '프로젝트가 이미 존재하는 경우',
      message: '프로젝트가 이미 존재합니다.',
      code: HttpStatus.CONFLICT,
    });
  }
}
