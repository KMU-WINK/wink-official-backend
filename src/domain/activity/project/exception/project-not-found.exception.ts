import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class ProjectNotFoundException extends ApiException {
  constructor() {
    super({
      swagger: '프로젝트를 찾을 수 없음',
      message: '프로젝트를 찾을 수 없습니다.',
      code: HttpStatus.NOT_FOUND,
    });
  }
}
