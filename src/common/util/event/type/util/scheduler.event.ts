export class PurgeUnusedAvatarEvent {
  public static readonly EVENT_NAME = 'scheduler.purge_unused_avatar';

  constructor(public readonly keys: string[]) {}
}
