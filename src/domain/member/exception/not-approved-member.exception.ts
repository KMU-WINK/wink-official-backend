import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../../../common/utils/swagger';

export class NotApprovedMemberException extends ApiException {
  constructor() {
    super({
      swagger: '승인되지 않은 계정일 때',
      message: '승인되지 않은 계정입니다.',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
