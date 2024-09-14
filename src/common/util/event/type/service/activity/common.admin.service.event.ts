import { Member } from '@wink/member/schema';

export class UploadEvent {
  public static readonly EVENT_NAME = 'activity.common.admin.upload';

  constructor(
    public readonly member: Member,
    public readonly file: Express.Multer.File,
  ) {}
}
