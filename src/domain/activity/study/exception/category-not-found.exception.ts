import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@wink/swagger';

export class CategoryNotFoundException extends ApiException {
  constructor() {
    super({
      swagger: '카테고리를 찾을 수 없는 경우',
      message: '카테고리를 찾을 수 없습니다.',
      code: HttpStatus.NOT_FOUND,
    });
  }
}
