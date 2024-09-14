import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class ImageTooLargeException extends ApiException {
  constructor() {
    super({
      swagger: '사진의 용량이 너무 큰 경우',
      message: '사진의 용량은 10MB를 넘을 수 없습니다.',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
