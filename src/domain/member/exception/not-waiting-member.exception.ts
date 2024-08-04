import { HttpException } from '@nestjs/common';

export class NotWaitingMemberException extends HttpException {
  constructor() {
    super('이 계정은 대기 중인 계정이 아닙니다.', 400);
  }
}
