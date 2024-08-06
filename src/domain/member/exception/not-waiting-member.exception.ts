import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class NotWaitingMemberException extends ApiException {
  constructor() {
    super({
      swagger: '이미 승인된 계정일 때',
      message: '이미 승인된 계정입니다.',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
