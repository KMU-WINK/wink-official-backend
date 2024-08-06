import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../../../common/utils/swagger';

export class MemberNotFoundException extends ApiException {
  constructor() {
    super({
      swagger: '멤버를 찾을 수 없을 때',
      message: '멤버를 찾을 수 없습니다.',
      code: HttpStatus.NOT_FOUND,
    });
  }
}
