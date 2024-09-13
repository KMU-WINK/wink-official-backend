import { Injectable } from '@nestjs/common';

import { Member } from '@wink/member/schema';

import {
  CreateStudyRequestDto,
  CreateStudyResponseDto,
  DeleteStudyRequestDto,
} from '@wink/activity/dto';
import { StudyNotFoundException } from '@wink/activity/exception';
import { StudyRepository } from '@wink/activity/repository';
import { Study } from '@wink/activity/schema';

import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class StudyAdminService {
  constructor(private readonly studyRepository: StudyRepository) {}

  async createStudy(
    member: Member,
    { link }: CreateStudyRequestDto,
  ): Promise<CreateStudyResponseDto> {
    const html = await axios.get(link);
    const $ = cheerio.load(html.data);

    const title = $('meta[property="og:title"]').attr('content')!;
    const content = $('meta[property="og:description"]').attr('content')!;
    const image = $('meta[property="og:image"]').attr('content')!;
    const uploadedAt = $('meta[property="article:published_time"]').attr('content')!;

    const study: Partial<Study> = {
      author: member,
      title,
      content,
      image,
      uploadedAt: new Date(uploadedAt),
      link,
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
