import { Member } from '@wink/member/schema';

export class LoginEvent {
  public static readonly EVENT_NAME = 'auth.login';

  constructor(public readonly member: Member) {}
}

export class RefreshEvent {
  public static readonly EVENT_NAME = 'auth.refresh';

  constructor(public readonly member: Member) {}
}

export class RegisterEvent {
  public static readonly EVENT_NAME = 'auth.register';

  constructor(public readonly member: Member) {}
}

export class SendCodeEvent {
  public static readonly EVENT_NAME = 'auth.send_code';

  constructor(
    public readonly email: string,
    public readonly code: string,
  ) {}
}

export class VerifyCodeEvent {
  public static readonly EVENT_NAME = 'auth.verify_code';

  constructor(
    public readonly email: string,
    public readonly token: string,
  ) {}
}
