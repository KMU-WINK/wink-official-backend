import { Injectable } from '@nestjs/common';

import { ProjectNotFoundException } from '@wink/activity/exception';
import {
  GetProjectRequestDto,
  GetProjectResponseDto,
  GetProjectsPageResponseDto,
  GetProjectsRequestDto,
  GetProjectsResponseDto,
} from '@wink/activity/dto';
import { ProjectRepository } from '@wink/activity/repository';

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
    const page = Math.ceil(projects.length / 10);

    return { page };
  }

  async getProjects({ page }: GetProjectsRequestDto): Promise<GetProjectsResponseDto> {
    const projects = await this.projectRepository.findAllPage(page);

    return { projects };
  }
}
