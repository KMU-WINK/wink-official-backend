import { EmailTemplateBase } from '../../../mail';

export class MailSendEvent {
  public static readonly EVENT_NAME = 'mail.send';

  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly html: string,
  ) {}
}

export class MailTemplateSendEvent {
  public static readonly EVENT_NAME = 'mail.send_template';

  constructor(
    public readonly to: string,
    public readonly template: EmailTemplateBase,
  ) {}
}
