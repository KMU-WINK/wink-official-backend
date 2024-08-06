import { Member } from '../../../../../domain/member/schema';

export class UpdateMyInfoEvent {
  public static readonly EVENT_NAME = 'member.updateMyInfo';

  constructor(
    public readonly member: Member,
    public readonly description: string | null,
    public readonly github: string | null,
    public readonly instagram: string | null,
    public readonly blog: string | null,
  ) {}
}

export class UpdateMyPasswordEvent {
  public static readonly EVENT_NAME = 'member.updateMyPassword';

  constructor(public readonly member: Member) {}
}

export class UpdateMyAvatarEvent {
  public static readonly EVENT_NAME = 'member.updateMyAvatar';

  constructor(
    public readonly member: Member,
    public readonly avatar: string,
  ) {}
}

export class DeleteMyAvatarEvent {
  public static readonly EVENT_NAME = 'member.deleteMyAvatar';

  constructor(public readonly member: Member) {}
}
