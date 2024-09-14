import { Injectable } from '@nestjs/common';

import {
  CreateSocialRequestDto,
  CreateSocialResponseDto,
  DeleteSocialRequestDto,
  UpdateSocialRequestDto,
} from '@wink/activity/dto';
import { AlreadyExistsSocialException, SocialNotFoundException } from '@wink/activity/exception';
import { SocialRepository } from '@wink/activity/repository';
import { Social } from '@wink/activity/schema';

@Injectable()
export class SocialAdminService {
  constructor(private readonly socialRepository: SocialRepository) {}

  async createSocial({
    title,
    contents,
  }: CreateSocialRequestDto): Promise<CreateSocialResponseDto> {
    if (!(await this.socialRepository.existsByTitle(title))) {
      throw new AlreadyExistsSocialException();
    }

    const social: Partial<Social> = {
      title,
      contents,
    };

    const savedSocial = await this.socialRepository.save(social);

    return { social: savedSocial };
  }

  async updateSocial({ socialId, title, contents }: UpdateSocialRequestDto): Promise<void> {
    if (!(await this.socialRepository.existsById(socialId))) {
      throw new SocialNotFoundException();
    }

    await this.socialRepository.updateTitleById(socialId, title);
    await this.socialRepository.updateContentsById(socialId, contents);
  }

  async deleteSocial({ socialId }: DeleteSocialRequestDto): Promise<void> {
    if (!(await this.socialRepository.existsById(socialId))) {
      throw new SocialNotFoundException();
    }

    await this.socialRepository.deleteById(socialId);
  }
}
