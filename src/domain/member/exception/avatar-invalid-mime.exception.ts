import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../../../common/utils/swagger';

export class AvatarInvalidMimeException extends ApiException {
  constructor() {
    super({
      swagger: '프로필 사진의 확장자가 유효하지 않은 경우',
      message: '프로필 사진의 확장자는 jpg, jpeg, png만 허용됩니다.',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
