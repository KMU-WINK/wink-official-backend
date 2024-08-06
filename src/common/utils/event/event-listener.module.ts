import { Module } from '@nestjs/common';

import {
  AuthServiceEventListener,
  MemberAdminServiceEventListener,
  MemberServiceEventListener,
  MailEventListener,
  RedisServiceEventListener,
  S3ServiceEventListener,
  SchedulerEventListener,
} from './listener';

@Module({
  providers: [
    AuthServiceEventListener,
    MemberAdminServiceEventListener,
    MemberServiceEventListener,

    MailEventListener,
    RedisServiceEventListener,
    S3ServiceEventListener,
    SchedulerEventListener,
  ],
})
export class EventListenerModule {}
