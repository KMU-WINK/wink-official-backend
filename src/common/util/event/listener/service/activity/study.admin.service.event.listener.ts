import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  CreateCategoryEvent,
  UpdateCategoryEvent,
  DeleteCategoryEvent,
  CreateStudyEvent,
  DeleteStudyEvent,
} from '../../../type';

@Injectable()
export class StudyAdminServiceEventListener {
  private readonly logger = new Logger(StudyAdminServiceEventListener.name);

  @OnEvent(CreateCategoryEvent.EVENT_NAME)
  onCreateCategory({ member, category }: CreateCategoryEvent) {
    this.logger.log(
      `Create category from ${member.name} (study: ${category.name} (${category._id}))`,
    );
  }

  @OnEvent(UpdateCategoryEvent.EVENT_NAME)
  onUpdateCategory({ member, category }: UpdateCategoryEvent) {
    this.logger.log(
      `Update category from ${member.name} (study: ${category.name} (${category._id}))`,
    );
  }

  @OnEvent(DeleteCategoryEvent.EVENT_NAME)
  onDeleteCategory({ member, category }: DeleteCategoryEvent) {
    this.logger.log(
      `Delete category from ${member.name} (study: ${category.name} (${category._id}))`,
    );
  }

  @OnEvent(CreateStudyEvent.EVENT_NAME)
  onCreateStudy({ member, study }: CreateStudyEvent) {
    this.logger.log(`Create study from ${member.name} (study: ${study.title} (${study._id}))`);
  }

  @OnEvent(DeleteStudyEvent.EVENT_NAME)
  onDeleteStudy({ member, study }: DeleteStudyEvent) {
    this.logger.log(`Delete study from ${member.name} (study: ${study.title} (${study._id}))`);
  }
}
