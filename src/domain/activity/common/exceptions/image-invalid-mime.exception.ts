import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class ImageInvalidMimeException extends ApiException {
  constructor() {
    super({
      swagger: '사진 파일이 아닌 경우',
      message: '사진 파일이 아닙니다.',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
