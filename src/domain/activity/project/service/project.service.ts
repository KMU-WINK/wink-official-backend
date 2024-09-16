import { Injectable } from '@nestjs/common';

import {
  GetProjectRequestDto,
  GetProjectResponseDto,
  GetProjectsPageResponseDto,
  GetProjectsRequestDto,
  GetProjectsResponseDto,
} from '@wink/activity/dto';
import { ProjectNotFoundException } from '@wink/activity/exception';
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
    const count = await this.projectRepository.count();

    return { page: Math.ceil(count / 15) };
  }

  async getProjects({ page }: GetProjectsRequestDto): Promise<GetProjectsResponseDto> {
    const projects = await this.projectRepository.findAllPage(page);

    return { projects };
  }
}
