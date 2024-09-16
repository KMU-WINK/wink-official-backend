import { Injectable } from '@nestjs/common';

import {
  GetCategoriesResponseDto,
  GetStudiesPageResponseDto,
  GetStudiesRequestDto,
  GetStudiesResponseDto,
  SearchStudyRequestDto,
} from '@wink/activity/dto';
import { CategoryRepository, StudyRepository } from '@wink/activity/repository';
import { Category } from '@wink/activity/study/schema';

@Injectable()
export class StudyService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly studyRepository: StudyRepository,
  ) {}

  async getCategories(): Promise<GetCategoriesResponseDto> {
    const studies = await this.studyRepository.findAll();
    const categories = (await this.categoryRepository.findAll()).map((category) => ({
      ...('_doc' in category ? <Category>category._doc : category),
      dependencies: studies.filter((study) => study.category.name === category.name).length,
    }));

    return { categories };
  }

  async getStudies({ page }: GetStudiesRequestDto): Promise<GetStudiesResponseDto> {
    const studies = await this.studyRepository.findAllPage(page);

    return { studies };
  }

  async searchStudies({ query }: SearchStudyRequestDto): Promise<GetStudiesResponseDto> {
    const studies = await this.studyRepository.findAllByContainsTitle(query);

    return { studies };
  }

  async getStudiesPage(): Promise<GetStudiesPageResponseDto> {
    const count = await this.studyRepository.count();

    return { page: Math.ceil(count / 10) };
  }
}
