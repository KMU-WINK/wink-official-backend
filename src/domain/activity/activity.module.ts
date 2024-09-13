import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberModule } from '@wink/member/member.module';

import {
  ProjectController,
  StudyController,
  StudyAdminController,
  SocialController,
} from '@wink/activity/controller';
import { ProjectRepository, StudyRepository, SocialRepository } from '@wink/activity/repository';
import {
  Activity,
  ActivitySchema,
  ActivityType,
  ProjectSchema,
  SocialSchema,
  StudySchema,
} from '@wink/activity/schema';
import {
  ProjectService,
  StudyService,
  StudyAdminService,
  SocialService,
} from '@wink/activity/service';

import { MongoModelFactory } from '@wink/mongo';

const modelFactory = MongoModelFactory.generateRecursive<Activity>(Activity.name, ActivitySchema, [
  { type: ActivityType.Project, schema: ProjectSchema },
  { type: ActivityType.Social, schema: SocialSchema },
  { type: ActivityType.Study, schema: StudySchema },
]);

@Module({
  imports: [MongooseModule.forFeature([modelFactory]), MemberModule],
  controllers: [ProjectController, StudyController, StudyAdminController, SocialController],
  providers: [
    ProjectService,
    StudyService,
    StudyAdminService,
    SocialService,

    ProjectRepository,
    StudyRepository,
    SocialRepository,
  ],
  exports: [ProjectRepository, StudyRepository, SocialRepository],
})
export class ActivityModule {}
