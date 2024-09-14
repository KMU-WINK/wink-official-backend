import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class SocialNotFoundException extends ApiException {
  constructor() {
    super({
      swagger: '친목 활동을 찾을 수 없는 경우',
      message: '친목 활동을 찾을 수 없습니다.',
      code: HttpStatus.NOT_FOUND,
    });
  }
}
