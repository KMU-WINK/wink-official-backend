import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActivityController } from '@wink/activity/controller';
import { ActivityService } from '@wink/activity/service';
import {
  Activity,
  ActivitySchema,
  ActivityType,
  ProjectSchema,
  SocialSchema,
  StudySchema,
} from '@wink/activity/schema';

import { MongoModelFactory } from '@wink/mongo';

const modelFactory = MongoModelFactory.generateRecursive<Activity>(Activity.name, ActivitySchema, [
  { type: ActivityType.Project, schema: ProjectSchema },
  { type: ActivityType.Social, schema: SocialSchema },
  { type: ActivityType.Study, schema: StudySchema },
]);

@Module({
  imports: [MongooseModule.forFeatureAsync([modelFactory])],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
