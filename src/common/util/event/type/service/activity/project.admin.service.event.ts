import { Member } from '@wink/member/schema';

import { Project } from '@wink/activity/schema';

export class CreateProjectEvent {
  public static readonly EVENT_NAME = 'activity.project.admin.create_project';

  constructor(
    public readonly member: Member,
    public readonly project: Project,
  ) {}
}

export class UpdateProjectEvent {
  public static readonly EVENT_NAME = 'activity.project.admin.update_project';

  constructor(
    public readonly member: Member,
    public readonly project: Project,
  ) {}
}

export class DeleteProjectEvent {
  public static readonly EVENT_NAME = 'activity.project.admin.delete_project';

  constructor(
    public readonly member: Member,
    public readonly project: Project,
  ) {}
}
