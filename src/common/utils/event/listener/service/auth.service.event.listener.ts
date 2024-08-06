import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { RegisterEvent, SendCodeEvent, VerifyCodeEvent } from '../../type';

@Injectable()
export class AuthServiceEventListener {
  private readonly logger = new Logger(AuthServiceEventListener.name);

  @OnEvent(RegisterEvent.EVENT_NAME)
  onRegister({ member }: RegisterEvent) {
    this.logger.log(
      `RegisterEvent: { name: ${member.name}, email: ${member.email}, studentId: ${member.studentId}, id: ${member._id} }`,
    );
  }

  @OnEvent(SendCodeEvent.EVENT_NAME)
  onSendCode({ email, code }: SendCodeEvent) {
    this.logger.log(`SendCodeEvent: { email: ${email}, code: ${code} }`);
  }

  @OnEvent(VerifyCodeEvent.EVENT_NAME)
  onVerifyCode({ email, token }: VerifyCodeEvent) {
    this.logger.log(`VerifyCodeEvent: { email: ${email}, token: ${token} }`);
  }
}
