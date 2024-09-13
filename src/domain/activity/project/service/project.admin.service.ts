import { Injectable } from '@nestjs/common';

import { Member } from '@wink/member/schema';

import { ProjectNotFoundException } from '@wink/activity/project/exception';
import {
  CreateProjectRequestDto,
  CreateProjectResponseDto,
  DeleteProjectRequestDto,
  UpdateProjectRequestDto,
} from '@wink/activity/project/dto';
import { ProjectRepository } from '@wink/activity/project/repository';
import { Project } from '@wink/activity/project/schema';

@Injectable()
export class ProjectAdminService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(
    member: Member,
    { title, tags, content, image }: CreateProjectRequestDto,
  ): Promise<CreateProjectResponseDto> {
    const project: Partial<Project> = {
      title,
      tags,
      content,
      image,
      author: member,
    };

    const createdProject = await this.projectRepository.save(project);

    return { project: createdProject };
  }

  async updateProject({
    projectId,
    title,
    tags,
    content,
    image,
  }: UpdateProjectRequestDto): Promise<void> {
    if (!(await this.projectRepository.existsById(projectId))) {
      throw new ProjectNotFoundException();
    }

    await this.projectRepository.updateTitleById(projectId, title);
    await this.projectRepository.updateTagsById(projectId, tags);
    await this.projectRepository.updateContentById(projectId, content);
    await this.projectRepository.updateImageById(projectId, image);
  }

  async deleteProject({ projectId }: DeleteProjectRequestDto): Promise<void> {
    if (!(await this.projectRepository.existsById(projectId))) {
      throw new ProjectNotFoundException();
    }

    await this.projectRepository.deleteById(projectId);
  }
}
