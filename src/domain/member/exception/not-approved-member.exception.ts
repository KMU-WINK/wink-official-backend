import { HttpException } from '@nestjs/common';

export class NotApprovedMemberException extends HttpException {
  constructor() {
    super('이 계정은 승인된 계정이 아닙니다.', 400);
  }
}
