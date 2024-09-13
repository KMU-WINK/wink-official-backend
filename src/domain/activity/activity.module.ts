import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberModule } from '@wink/member/member.module';

import {
  ProjectController,
  StudyController,
  StudyAdminController,
  SocialController,
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
  StudyService,
  StudyAdminService,
  SocialService,
} from '@wink/activity/service';

import { MongoModelFactory } from '@wink/mongo';

const modelFactory1 = MongoModelFactory.generateRecursive<Activity>(Activity.name, ActivitySchema, [
  { type: ActivityType.Project, schema: ProjectSchema },
  { type: ActivityType.Social, schema: SocialSchema },
  { type: ActivityType.Study, schema: StudySchema },
]);

const modelFactory2 = MongoModelFactory.generate<Category>(Category.name, CategorySchema);

/**
 * TODO:
 *   - [ ] Study에서 OG를 동적으로 불러오게 하고 싶음.
 *   - [ ] Study에서 카테고리를 제공해야 함.
 */
@Module({
  imports: [MongooseModule.forFeature([modelFactory1, modelFactory2]), MemberModule],
  controllers: [ProjectController, StudyController, StudyAdminController, SocialController],
  providers: [
    ProjectService,
    StudyService,
    StudyAdminService,
    SocialService,

    ProjectRepository,
    StudyRepository,
    CategoryRepository,
    SocialRepository,
  ],
  exports: [ProjectRepository, StudyRepository, CategoryRepository, SocialRepository],
})
export class ActivityModule {}
