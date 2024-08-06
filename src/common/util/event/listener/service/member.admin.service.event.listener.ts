import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  ApproveWaitingMemberEvent,
  RejectWaitingMemberEvent,
  UpdateFeeEvent,
  UpdateRoleEvent,
} from '../../type';

@Injectable()
export class MemberAdminServiceEventListener {
  private readonly logger = new Logger(MemberAdminServiceEventListener.name);

  @OnEvent(ApproveWaitingMemberEvent.EVENT_NAME)
  onApproveWaitingMember({ from, to }: ApproveWaitingMemberEvent) {
    this.logger.log(`Approve member: ${to.name} (${to._id}) by ${from.name} (${from._id})`);
  }

  @OnEvent(RejectWaitingMemberEvent.EVENT_NAME)
  onRejectWaitingMember({ from, to }: RejectWaitingMemberEvent) {
    this.logger.log(`Reject member: ${to.name} (${to._id}) by ${from.name} (${from._id})`);
  }

  @OnEvent(UpdateRoleEvent.EVENT_NAME)
  onUpdateRole({ from, to, role }: UpdateRoleEvent) {
    this.logger.log(`Update role: ${to.name} (${to._id}) by ${from.name} (${from._id}) to ${role}`);
  }

  @OnEvent(UpdateFeeEvent.EVENT_NAME)
  onUpdateFee({ from, to, fee }: UpdateFeeEvent) {
    this.logger.log(`Update fee: ${to.name} (${to._id}) by ${from.name} (${from._id}) to ${fee}`);
  }
}
