import { Module } from '@nestjs/common';

import { AuthServiceEventListener } from './service';

@Module({
  providers: [AuthServiceEventListener],
})
export class EventListenerModule {}
