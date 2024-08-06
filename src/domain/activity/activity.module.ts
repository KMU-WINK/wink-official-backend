import { Module } from '@nestjs/common';

import { ActivityController } from '@wink/activity/controller';
import { ActivityService } from '@wink/activity/service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
