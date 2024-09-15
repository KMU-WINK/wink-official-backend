import { Module } from '@nestjs/common';

import {
  AuthServiceEventListener,
  CommonAdminServiceEventListener,
  MailEventListener,
  MemberAdminServiceEventListener,
  MemberServiceEventListener,
  ProjectAdminServiceEventListener,
  RedisServiceEventListener,
  S3ServiceEventListener,
  SchedulerEventListener,
  SocialAdminServiceEventListener,
  StudyAdminServiceEventListener,
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
