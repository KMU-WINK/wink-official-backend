import { Module } from '@nestjs/common';

import { ActivityController } from './controller';
import { ActivityService } from './service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
