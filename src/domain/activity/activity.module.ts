import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectController, StudyController, SocialController } from '@wink/activity/controller';
import { ProjectRepository, StudyRepository, SocialRepository } from '@wink/activity/repository';
import {
  Activity,
  ActivitySchema,
  ActivityType,
  ProjectSchema,
  SocialSchema,
  StudySchema,
} from '@wink/activity/schema';
import { ProjectService, StudyService, SocialService } from '@wink/activity/service';

import { MongoModelFactory } from '@wink/mongo';

const modelFactory = MongoModelFactory.generateRecursive<Activity>(Activity.name, ActivitySchema, [
  { type: ActivityType.Project, schema: ProjectSchema },
  { type: ActivityType.Social, schema: SocialSchema },
  { type: ActivityType.Study, schema: StudySchema },
]);

@Module({
  imports: [MongooseModule.forFeature([modelFactory])],
  controllers: [ProjectController, StudyController, SocialController],
  providers: [
    ProjectService,
    StudyService,
    SocialService,
    ProjectRepository,
    StudyRepository,
    SocialRepository,
  ],
  exports: [ProjectRepository, StudyRepository, SocialRepository],
})
export class ActivityModule {}
