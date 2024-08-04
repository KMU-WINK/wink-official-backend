import { HttpException } from '@nestjs/common';

export class AvatarTooLargeException extends HttpException {
  constructor() {
    super('프로필 사진의 크기가 너무 큽니다. (최대: 2MB)', 400);
  }
}
