import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberModule } from '@wink/member/member.module';

import { PurgeUnusedImageJob } from '@wink/activity/common/util/scheduler';
import {
  ActivityAdminController,
  ProjectAdminController,
  ProjectController,
  SocialAdminController,
  SocialController,
  StudyAdminController,
  StudyController,
} from '@wink/activity/controller';
import {
  CategoryRepository,
  ProjectRepository,
  SocialRepository,
  StudyRepository,
} from '@wink/activity/repository';
import {
  Activity,
  ActivitySchema,
  ActivityType,
  Category,
  CategorySchema,
  ProjectSchema,
  SocialSchema,
  StudySchema,
} from '@wink/activity/schema';
import {
  ActivityAdminService,
  ProjectAdminService,
  ProjectService,
  SocialAdminService,
  SocialService,
  StudyAdminService,
  StudyService,
} from '@wink/activity/service';

import { MongoModelFactory } from '@wink/mongo';
import { S3Module } from '@wink/s3';

const modelFactory1 = MongoModelFactory.generateRecursive<Activity>(Activity.name, ActivitySchema, [
  { type: ActivityType.Project, schema: ProjectSchema },
  { type: ActivityType.Social, schema: SocialSchema },
  { type: ActivityType.Study, schema: StudySchema },
]);

const modelFactory2 = MongoModelFactory.generate<Category>(Category.name, CategorySchema);

@Module({
  imports: [
    MongooseModule.forFeature([modelFactory1, modelFactory2]),
    S3Module.forRoot({ directory: 'activity' }),
    MemberModule,
  ],
  controllers: [
    ActivityAdminController,
    ProjectController,
    ProjectAdminController,
    StudyController,
    StudyAdminController,
    SocialController,
    SocialAdminController,
  ],
  providers: [
    ActivityAdminService,
    ProjectService,
    ProjectAdminService,
    StudyService,
    StudyAdminService,
    SocialService,
    SocialAdminService,

    ProjectRepository,
    StudyRepository,
    CategoryRepository,
    SocialRepository,

    PurgeUnusedImageJob,
  ],
  exports: [ProjectRepository, StudyRepository, CategoryRepository, SocialRepository],
})
export class ActivityModule {}
