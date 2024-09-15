import { Role } from '@wink/member/constant';
import { Member } from '@wink/member/schema';

export class ApproveWaitingMemberEvent {
  public static readonly EVENT_NAME = 'member.admin.approve_waiting_member';

  constructor(
    public readonly from: Member,
    public readonly to: Member,
  ) {}
}

export class RejectWaitingMemberEvent {
  public static readonly EVENT_NAME = 'member.admin.reject_waiting_member';

  constructor(
    public readonly from: Member,
    public readonly to: Member,
  ) {}
}

export class UpdateRoleEvent {
  public static readonly EVENT_NAME = 'member.admin.update_role';

  constructor(
    public readonly from: Member,
    public readonly to: Member,
    public readonly role: Role,
  ) {}
}

export class UpdateFeeEvent {
  public static readonly EVENT_NAME = 'member.admin.update_fee';

  constructor(
    public readonly from: Member,
    public readonly to: Member,
    public readonly fee: boolean,
  ) {}
}
