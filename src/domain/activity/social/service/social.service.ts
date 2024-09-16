import { Injectable } from '@nestjs/common';

import {
  GetSocialRequestDto,
  GetSocialResponseDto,
  GetSocialsPageResponseDto,
  GetSocialsRequestDto,
  GetSocialsResponseDto,
  SearchSocialsRequestDto,
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

  async getSocials({ page }: GetSocialsRequestDto): Promise<GetSocialsResponseDto> {
    const socials = await this.socialRepository.findAllPage(page);

    return { socials };
  }

  async searchSocials({ query }: SearchSocialsRequestDto): Promise<GetSocialsResponseDto> {
    const socials = await this.socialRepository.findAllByContainsTitle(query);

    return { socials };
  }

  async getSocialsPage(): Promise<GetSocialsPageResponseDto> {
    const count = await this.socialRepository.count();

    return { page: Math.ceil(count / 10) };
  }
}
