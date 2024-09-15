import { Member } from '@wink/member/schema';

import { Category, Study } from '@wink/activity/schema';

export class CreateCategoryEvent {
  public static readonly EVENT_NAME = 'activity.study.admin.create_category';

  constructor(
    public readonly member: Member,
    public readonly category: Category,
  ) {}
}

export class UpdateCategoryEvent {
  public static readonly EVENT_NAME = 'activity.study.admin.update_category';

  constructor(
    public readonly member: Member,
    public readonly category: Category,
  ) {}
}

export class DeleteCategoryEvent {
  public static readonly EVENT_NAME = 'activity.study.admin.delete_category';

  constructor(
    public readonly member: Member,
    public readonly category: Category,
  ) {}
}

export class CreateStudyEvent {
  public static readonly EVENT_NAME = 'activity.study.admin.create_study';

  constructor(
    public readonly member: Member,
    public readonly study: Study,
  ) {}
}

export class DeleteStudyEvent {
  public static readonly EVENT_NAME = 'activity.study.admin.delete_study';

  constructor(
    public readonly member: Member,
    public readonly study: Study,
  ) {}
}
