import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CreateProjectEvent, DeleteProjectEvent, UpdateProjectEvent } from '../../../type';

@Injectable()
export class ProjectAdminServiceEventListener {
  private readonly logger = new Logger(ProjectAdminServiceEventListener.name);

  @OnEvent(CreateProjectEvent.EVENT_NAME)
  onCreateProject({ member, project }: CreateProjectEvent) {
    this.logger.log(
      `Create project from ${member.name} (project: ${project.title} (${project._id}))`,
    );
  }

  @OnEvent(UpdateProjectEvent.EVENT_NAME)
  onUpdateProject({ member, project }: UpdateProjectEvent) {
    this.logger.log(
      `Update project from ${member.name} (project: ${project.title} (${project._id}))`,
    );
  }

  @OnEvent(DeleteProjectEvent.EVENT_NAME)
  onDeleteProject({ member, project }: DeleteProjectEvent) {
    this.logger.log(
      `Delete project from ${member.name} (project: ${project.title} (${project._id}))`,
    );
  }
}
