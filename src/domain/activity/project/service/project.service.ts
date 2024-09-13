import { Injectable } from '@nestjs/common';

import { ProjectNotFoundException } from '@wink/activity/project/exception';
import { ProjectRepository } from '@wink/activity/project/repository';
import {
  GetProjectRequestDto,
  GetProjectResponseDto,
  GetProjectsPageResponseDto,
  GetProjectsResponseDto,
} from '@wink/activity/project/dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getProject({ projectId }: GetProjectRequestDto): Promise<GetProjectResponseDto> {
    if (!(await this.projectRepository.existsById(projectId))) {
      throw new ProjectNotFoundException();
    }

    const project = (await this.projectRepository.findById(projectId))!;

    return { project };
  }

  async getProjectsPage(): Promise<GetProjectsPageResponseDto> {
    const projects = await this.projectRepository.findAll();
    const page = Math.ceil(projects.length / 15);

    return { page };
  }

  async getProjects(page: number): Promise<GetProjectsResponseDto> {
    const projects = await this.projectRepository.findAllPage(page);

    return { projects };
  }
}
