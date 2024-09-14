import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberModule } from '@wink/member/member.module';

import {
  ProjectController,
  ProjectAdminController,
  StudyController,
  StudyAdminController,
  SocialController,
  SocialAdminController,
} from '@wink/activity/controller';
import {
  ProjectRepository,
  StudyRepository,
  SocialRepository,
  CategoryRepository,
} from '@wink/activity/repository';
import {
  Activity,
  ActivitySchema,
  ActivityType,
  ProjectSchema,
  SocialSchema,
  StudySchema,
  Category,
  CategorySchema,
} from '@wink/activity/schema';
import {
  ProjectService,
  ProjectAdminService,
  StudyService,
  StudyAdminService,
  SocialService,
  SocialAdminService,
} from '@wink/activity/service';

import { MongoModelFactory } from '@wink/mongo';

const modelFactory1 = MongoModelFactory.generateRecursive<Activity>(Activity.name, ActivitySchema, [
  { type: ActivityType.Project, schema: ProjectSchema },
  { type: ActivityType.Social, schema: SocialSchema },
  { type: ActivityType.Study, schema: StudySchema },
]);

const modelFactory2 = MongoModelFactory.generate<Category>(Category.name, CategorySchema);

@Module({
  imports: [MongooseModule.forFeature([modelFactory1, modelFactory2]), MemberModule],
  controllers: [
    ProjectController,
    ProjectAdminController,
    StudyController,
    StudyAdminController,
    SocialController,
    SocialAdminController,
  ],
  providers: [
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
  ],
  exports: [ProjectRepository, StudyRepository, CategoryRepository, SocialRepository],
})
export class ActivityModule {}
