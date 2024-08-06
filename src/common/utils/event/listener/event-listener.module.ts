import { Module } from '@nestjs/common';

import {
  AuthServiceEventListener,
  MemberAdminServiceEventListener,
  MemberServiceEventListener,
} from './service';

import {
  MailEventListener,
  RedisServiceEventListener,
  S3ServiceEventListener,
  SchedulerEventListener,
} from './util';

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
