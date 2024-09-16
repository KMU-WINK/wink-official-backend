import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Member } from '@wink/member/schema';

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
import { CategoryRepository, StudyRepository } from '@wink/activity/repository';
import { Category, Study } from '@wink/activity/schema';

import {
  CreateCategoryEvent,
  CreateStudyEvent,
  DeleteCategoryEvent,
  DeleteStudyEvent,
  UpdateCategoryEvent,
} from '@wink/event';

import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class StudyAdminService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly studyRepository: StudyRepository,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createCategory(
    member: Member,
    { category: name }: CreateCategoryRequestDto,
  ): Promise<CreateCategoryResponseDto> {
    if (await this.categoryRepository.existsByName(name)) {
      throw new AlreadyExistsCategoryException();
    }

    const category: Partial<Category> = { name };

    const savedCategory = await this.categoryRepository.save(category);

    this.eventEmitter.emit(
      CreateCategoryEvent.EVENT_NAME,
      new CreateCategoryEvent(member, savedCategory),
    );

    return { category: savedCategory };
  }

  async updateCategory(
    member: Member,
    { categoryId, category: name }: UpdateCategoryRequestDto,
  ): Promise<void> {
    if (!(await this.categoryRepository.existsById(categoryId))) {
      throw new CategoryNotFoundException();
    }

    const category = (await this.categoryRepository.findById(categoryId))!;

    if (name !== category.name && (await this.categoryRepository.existsByName(name))) {
      throw new AlreadyExistsCategoryException();
    }

    category.name = name;

    await this.categoryRepository.save(category);

    this.eventEmitter.emit(
      UpdateCategoryEvent.EVENT_NAME,
      new UpdateCategoryEvent(member, category),
    );
  }

  async deleteCategory(member: Member, { categoryId }: DeleteCategoryRequestDto): Promise<void> {
    if (!(await this.categoryRepository.existsById(categoryId))) {
      throw new CategoryNotFoundException();
    }

    const category = (await this.categoryRepository.findById(categoryId))!;

    await this.studyRepository.deleteByCategory(category);
    await this.categoryRepository.deleteById(categoryId);

    this.eventEmitter.emit(
      DeleteCategoryEvent.EVENT_NAME,
      new DeleteCategoryEvent(member, category),
    );
  }

  async createStudy(
    member: Member,
    { link }: CreateStudyRequestDto,
  ): Promise<CreateStudyResponseDto> {
    if (await this.studyRepository.existsByLink(link)) {
      throw new AlreadyExistsStudyException();
    }

    const { data: html } = await axios.get(link);
    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr('content')!;
    const content = $('meta[property="og:description"]').attr('content')!;
    const author = $('meta[property="og.article.author"]').attr('content')!;
    const image = decodeURIComponent(
      $('meta[property="og:image"]').attr('content')!.split('fname=')[1],
    );
    const rawUploadedAt = $('meta[property="article:published_time"]').attr('content')!;
    const uploadedAt = new Date(new Date(rawUploadedAt).getTime() + 9 * 60 * 60 * 1000);

    const entryInfoMatch = html.match(/window\.T\.entryInfo\s*=\s*({[^}]*});/);
    const entryInfo = entryInfoMatch ? JSON.parse(entryInfoMatch[1]) : null;
    const categoryLabel = entryInfo['categoryLabel'].replace('WINK-(Web & App)/', '');
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

    this.eventEmitter.emit(CreateStudyEvent.EVENT_NAME, new CreateStudyEvent(member, createdStudy));

    return {
      study: createdStudy,
    };
  }

  async deleteStudy(member: Member, { studyId }: DeleteStudyRequestDto): Promise<void> {
    if (!(await this.studyRepository.existsById(studyId))) {
      throw new StudyNotFoundException();
    }

    const study = (await this.studyRepository.findById(studyId))!;

    await this.studyRepository.deleteById(studyId);

    this.eventEmitter.emit(DeleteStudyEvent.EVENT_NAME, new DeleteStudyEvent(member, study));
  }
}
