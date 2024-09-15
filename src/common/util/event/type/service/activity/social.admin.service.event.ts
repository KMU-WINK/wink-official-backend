import { Member } from '@wink/member/schema';

import { Social } from '@wink/activity/schema';

export class CreateSocialEvent {
  public static readonly EVENT_NAME = 'activity.social.admin.create_social';

  constructor(
    public readonly member: Member,
    public readonly social: Social,
  ) {}
}

export class UpdateSocialEvent {
  public static readonly EVENT_NAME = 'activity.social.admin.update_social';

  constructor(
    public readonly member: Member,
    public readonly social: Social,
  ) {}
}

export class DeleteSocialEvent {
  public static readonly EVENT_NAME = 'activity.social.admin.delete_social';

  constructor(
    public readonly member: Member,
    public readonly social: Social,
  ) {}
}
