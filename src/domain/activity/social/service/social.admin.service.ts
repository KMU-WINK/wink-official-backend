import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Member } from '@wink/member/schema';

import {
  CreateSocialRequestDto,
  CreateSocialResponseDto,
  DeleteSocialRequestDto,
  UpdateSocialRequestDto,
} from '@wink/activity/dto';
import { AlreadyExistsSocialException, SocialNotFoundException } from '@wink/activity/exception';
import { SocialRepository } from '@wink/activity/repository';
import { Social } from '@wink/activity/schema';

import { CreateSocialEvent, DeleteSocialEvent, UpdateSocialEvent } from '@wink/event';

@Injectable()
export class SocialAdminService {
  constructor(
    private readonly socialRepository: SocialRepository,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createSocial(
    member: Member,
    { title, contents }: CreateSocialRequestDto,
  ): Promise<CreateSocialResponseDto> {
    if (!(await this.socialRepository.existsByTitle(title))) {
      throw new AlreadyExistsSocialException();
    }

    const social: Partial<Social> = {
      title,
      contents,
    };

    const savedSocial = await this.socialRepository.save(social);

    this.eventEmitter.emit(
      CreateSocialEvent.EVENT_NAME,
      new CreateSocialEvent(member, savedSocial),
    );

    return { social: savedSocial };
  }

  async updateSocial(
    member: Member,
    { socialId, title, contents }: UpdateSocialRequestDto,
  ): Promise<void> {
    if (!(await this.socialRepository.existsById(socialId))) {
      throw new SocialNotFoundException();
    }

    const social = (await this.socialRepository.findById(socialId))!;

    if (title !== social.title && (await this.socialRepository.existsByTitle(title))) {
      throw new AlreadyExistsSocialException();
    }

    social.title = title;
    social.contents = contents;

    await this.socialRepository.save(social);

    this.eventEmitter.emit(UpdateSocialEvent.EVENT_NAME, new UpdateSocialEvent(member, social));
  }

  async deleteSocial(member: Member, { socialId }: DeleteSocialRequestDto): Promise<void> {
    if (!(await this.socialRepository.existsById(socialId))) {
      throw new SocialNotFoundException();
    }

    const social = (await this.socialRepository.findById(socialId))!;

    await this.socialRepository.deleteById(socialId);

    this.eventEmitter.emit(DeleteSocialEvent.EVENT_NAME, new DeleteSocialEvent(member, social));
  }
}
