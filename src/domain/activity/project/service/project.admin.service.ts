import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Member } from '@wink/member/schema';

import {
  CreateProjectRequestDto,
  CreateProjectResponseDto,
  DeleteProjectRequestDto,
  UpdateProjectRequestDto,
} from '@wink/activity/dto';
import { AlreadyExistsProjectException, ProjectNotFoundException } from '@wink/activity/exception';
import { ProjectRepository } from '@wink/activity/repository';
import { Project } from '@wink/activity/schema';

import { CreateProjectEvent, DeleteProjectEvent, UpdateProjectEvent } from '@wink/event';

@Injectable()
export class ProjectAdminService {
  constructor(
    private readonly projectRepository: ProjectRepository,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createProject(
    member: Member,
    { title, content, tags, image }: CreateProjectRequestDto,
  ): Promise<CreateProjectResponseDto> {
    if (!(await this.projectRepository.existsByTitle(title))) {
      throw new AlreadyExistsProjectException();
    }

    const project: Partial<Project> = {
      title,
      content,
      tags,
      image,
      author: member,
    };

    const savedProject = await this.projectRepository.save(project);

    this.eventEmitter.emit(
      CreateProjectEvent.EVENT_NAME,
      new CreateProjectEvent(member, savedProject),
    );

    return { project: savedProject };
  }

  async updateProject(
    member: Member,
    { projectId, title, content, tags, image }: UpdateProjectRequestDto,
  ): Promise<void> {
    if (!(await this.projectRepository.existsById(projectId))) {
      throw new ProjectNotFoundException();
    }

    const project = (await this.projectRepository.findById(projectId))!;

    if (title !== project.title && (await this.projectRepository.existsByTitle(title))) {
      throw new AlreadyExistsProjectException();
    }

    project.title = title;
    project.content = content;
    project.tags = tags;
    project.image = image;

    await this.projectRepository.save(project);

    this.eventEmitter.emit(UpdateProjectEvent.EVENT_NAME, new UpdateProjectEvent(member, project));
  }

  async deleteProject(member: Member, { projectId }: DeleteProjectRequestDto): Promise<void> {
    if (!(await this.projectRepository.existsById(projectId))) {
      throw new ProjectNotFoundException();
    }

    const project = (await this.projectRepository.findById(projectId))!;

    await this.projectRepository.deleteById(projectId);

    this.eventEmitter.emit(DeleteProjectEvent.EVENT_NAME, new DeleteProjectEvent(member, project));
  }
}
