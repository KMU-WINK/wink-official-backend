import { Injectable } from '@nestjs/common';

import {
  GetCategoriesResponseDto,
  GetStudiesPageResponseDto,
  GetStudiesRequestDto,
  GetStudiesResponseDto,
} from '@wink/activity/dto';
import { StudyRepository, CategoryRepository } from '@wink/activity/repository';

@Injectable()
export class StudyService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly studyRepository: StudyRepository,
  ) {}

  async getCategories(): Promise<GetCategoriesResponseDto> {
    const categories = await this.categoryRepository.findAll();

    return { categories };
  }

  async getStudies({ page }: GetStudiesRequestDto): Promise<GetStudiesResponseDto> {
    const studies = await this.studyRepository.findAllPage(page);

    return { studies };
  }

  async getStudiesPage(): Promise<GetStudiesPageResponseDto> {
    const studies = await this.studyRepository.findAll();
    const page = Math.ceil(studies.length / 10);

    return { page };
  }
}
