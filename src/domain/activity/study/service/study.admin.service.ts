import { Injectable } from '@nestjs/common';

import {
  CreateCategoryRequestDto,
  CreateCategoryResponseDto,
  CreateStudyRequestDto,
  CreateStudyResponseDto,
  DeleteCategoryRequestDto,
  DeleteStudyRequestDto,
  UpdateCategoryRequestDto,
} from '@wink/activity/dto';
import {
  AlreadyExistsCategoryException,
  AlreadyExistsStudyException,
  CategoryNotFoundException,
  StudyNotFoundException,
} from '@wink/activity/exception';
import { StudyRepository, CategoryRepository } from '@wink/activity/repository';
import { Study, Category } from '@wink/activity/schema';

import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class StudyAdminService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly studyRepository: StudyRepository,
  ) {}

  async createCategory({
    category: name,
  }: CreateCategoryRequestDto): Promise<CreateCategoryResponseDto> {
    if (await this.categoryRepository.existsByName(name)) {
      throw new AlreadyExistsCategoryException();
    }

    const category: Category = { name };

    const savedCategory = await this.categoryRepository.save(category);

    return { category: savedCategory };
  }

  async updateCategory({ categoryId, category: name }: UpdateCategoryRequestDto): Promise<void> {
    if (!(await this.categoryRepository.existsById(categoryId))) {
      throw new CategoryNotFoundException();
    }

    await this.categoryRepository.updateNameById(categoryId, name);
  }

  async deleteCategory({ categoryId }: DeleteCategoryRequestDto): Promise<void> {
    if (!(await this.categoryRepository.existsById(categoryId))) {
      throw new CategoryNotFoundException();
    }

    await this.categoryRepository.deleteById(categoryId);
  }

  async createStudy({ link }: CreateStudyRequestDto): Promise<CreateStudyResponseDto> {
    if (await this.studyRepository.existsByLink(link)) {
      throw new AlreadyExistsStudyException();
    }

    const { data: html } = await axios.get(link);
    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr('content')!;
    const content = $('meta[property="og:description"]').attr('content')!;
    const author = $('meta[property="og.article.author"]').attr('content')!;
    const image = $('meta[property="og:image"]').attr('content')!;
    const rawUploadedAt = $('meta[property="article:published_time"]').attr('content')!;
    const uploadedAt = new Date(new Date(rawUploadedAt).getTime() + 9 * 60 * 60 * 1000);

    const entryInfoMatch = html.match(/window\.T\.entryInfo\s*=\s*({[^}]*});/);
    const entryInfo = entryInfoMatch ? JSON.parse(entryInfoMatch[1]) : null;
    const categoryLabel = entryInfo['categoryLabel'];
    const category = await this.categoryRepository.findByName(categoryLabel);

    if (!category) {
      throw new CategoryNotFoundException();
    }

    const study: Partial<Study> = {
      title,
      content,
      author,
      image,
      uploadedAt,
      link,
      category,
    };

    const createdStudy = await this.studyRepository.save(study);

    return {
      study: createdStudy,
    };
  }

  async deleteStudy({ studyId }: DeleteStudyRequestDto): Promise<void> {
    if (!(await this.studyRepository.existsById(studyId))) {
      throw new StudyNotFoundException();
    }

    return this.studyRepository.deleteById(studyId);
  }
}
