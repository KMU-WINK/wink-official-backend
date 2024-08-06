import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../../../common/utils/swagger';

export class PermissionException extends ApiException {
  constructor() {
    super({
      swagger: '권한이 없을 때',
      message: '권한이 없습니다.',
      code: HttpStatus.FORBIDDEN,
    });
  }
}
