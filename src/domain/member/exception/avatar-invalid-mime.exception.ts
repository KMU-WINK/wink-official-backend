import { HttpException } from '@nestjs/common';

export class AvatarInvalidMimeException extends HttpException {
  constructor() {
    super('프로필 사진은 JPEG 또는 PNG 형식만 지원합니다', 400);
  }
}
