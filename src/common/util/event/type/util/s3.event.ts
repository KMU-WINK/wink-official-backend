export class S3UploadEvent {
  public static readonly EVENT_NAME = 's3.upload';

  constructor(public readonly key: string) {}
}

export class S3DeleteEvent {
  public static readonly EVENT_NAME = 's3.delete';

  constructor(public readonly key: string) {}
}
