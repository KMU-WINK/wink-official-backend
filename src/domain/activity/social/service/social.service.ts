import { Injectable } from '@nestjs/common';

import {
  GetSocialRequestDto,
  GetSocialResponseDto,
  GetSocialsResponseDto,
} from '@wink/activity/dto';
import { SocialNotFoundException } from '@wink/activity/exception';
import { SocialRepository } from '@wink/activity/repository';

@Injectable()
export class SocialService {
  constructor(private readonly socialRepository: SocialRepository) {}

  async getSocial({ socialId }: GetSocialRequestDto): Promise<GetSocialResponseDto> {
    if (!(await this.socialRepository.existsById(socialId))) {
      throw new SocialNotFoundException();
    }

    const social = (await this.socialRepository.findById(socialId))!;

    return { social };
  }

  async getSocials(): Promise<GetSocialsResponseDto> {
    const socials = await this.socialRepository.findAll();

    return { socials };
  }
}
