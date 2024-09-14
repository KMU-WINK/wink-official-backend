import { Module } from '@nestjs/common';

import {
  AuthServiceEventListener,
  MemberAdminServiceEventListener,
  MemberServiceEventListener,
  MailEventListener,
  RedisServiceEventListener,
  S3ServiceEventListener,
  SchedulerEventListener,
  ProjectAdminServiceEventListener,
  CommonAdminServiceEventListener,
  StudyAdminServiceEventListener,
  SocialAdminServiceEventListener,
} from './listener';

@Module({
  providers: [
    AuthServiceEventListener,
    MemberAdminServiceEventListener,
    MemberServiceEventListener,
    CommonAdminServiceEventListener,
    ProjectAdminServiceEventListener,
    StudyAdminServiceEventListener,
    SocialAdminServiceEventListener,

    MailEventListener,
    RedisServiceEventListener,
    S3ServiceEventListener,
    SchedulerEventListener,
  ],
})
export class EventListenerModule {}
