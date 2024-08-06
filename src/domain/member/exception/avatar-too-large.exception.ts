import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../../../common/utils/swagger';

export class AvatarTooLargeException extends ApiException {
  constructor() {
    super({
      swagger: '프로필 사진의 용량이 너무 큰 경우',
      message: '프로필 사진의 용량은 2MB를 넘을 수 없습니다.',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
