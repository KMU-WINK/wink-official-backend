import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../../../common/utils/swagger';

export class UnauthorizedException extends ApiException {
  constructor() {
    super({
      swagger: '로그인 실패했을 때',
      message: '로그인에 실패했습니다.',
      code: HttpStatus.UNAUTHORIZED,
    });
  }
}
