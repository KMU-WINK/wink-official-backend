export class RedisSetEvent {
  public static readonly EVENT_NAME = 'redis.set';

  constructor(
    public readonly key: string,
    public readonly value: string,
  ) {}
}

export class RedisSetTtlEvent {
  public static readonly EVENT_NAME = 'redis.set_ttl';

  constructor(
    public readonly key: string,
    public readonly value: string,
    public readonly seconds: number,
  ) {}
}

export class RedisDeleteEvent {
  public static readonly EVENT_NAME = 'redis.delete';

  constructor(public readonly key: string) {}
}
