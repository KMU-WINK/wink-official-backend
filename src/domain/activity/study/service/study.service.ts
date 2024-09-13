import { Injectable } from '@nestjs/common';

import { GetStudiesResponse } from '@wink/activity/dto';
import { StudyRepository } from '@wink/activity/repository';

@Injectable()
export class StudyService {
  constructor(private readonly studyRepository: StudyRepository) {}

  async getStudies(): Promise<GetStudiesResponse> {
    const studies = await this.studyRepository.findAll();

    return { studies };
  }
}
