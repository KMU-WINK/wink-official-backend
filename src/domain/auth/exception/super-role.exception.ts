import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../../../common/utils/swagger';

export class SuperRoleException extends ApiException {
  constructor() {
    super({
      swagger: '나보다 권한이 높을 때',
      message: '내 권한보다 권한이 높은 사용자입니다.',
      code: HttpStatus.FORBIDDEN,
    });
  }
}
