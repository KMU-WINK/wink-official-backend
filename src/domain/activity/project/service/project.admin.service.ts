import { Injectable } from '@nestjs/common';

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

@Injectable()
export class ProjectAdminService {
  constructor(private readonly projectRepository: ProjectRepository) {}

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

    return { project: savedProject };
  }

  async updateProject({
    projectId,
    title,
    content,
    tags,
    image,
  }: UpdateProjectRequestDto): Promise<void> {
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
  }

  async deleteProject({ projectId }: DeleteProjectRequestDto): Promise<void> {
    if (!(await this.projectRepository.existsById(projectId))) {
      throw new ProjectNotFoundException();
    }

    await this.projectRepository.deleteById(projectId);
  }
}
