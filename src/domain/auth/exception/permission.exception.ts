import { HttpException } from '@nestjs/common';

export class PermissionException extends HttpException {
  constructor() {
    super('권한이 없습니다.', 403);
  }
}
