import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class StudyNotFoundException extends ApiException {
  constructor() {
    super({
      swagger: '스터디를 찾을 수 없는 경우',
      message: '스터디를 찾을 수 없습니다.',
      code: HttpStatus.NOT_FOUND,
    });
  }
}
