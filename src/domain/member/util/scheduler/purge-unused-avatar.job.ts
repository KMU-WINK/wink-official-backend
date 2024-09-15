import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { MemberRepository } from '@wink/member/repository';

import { S3Service } from '@wink/s3';
import { PurgeUnusedAvatarEvent } from '@wink/event';

@Injectable()
export class PurgeUnusedAvatarJob {
  constructor(
    private readonly memberRepository: MemberRepository,
    @Inject('S3_SERVICE_AVATAR') private readonly avatarService: S3Service,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Timeout(0)
  async onTimeout() {
    await this.#job();
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async onCron() {
    await this.#job();
  }

  async #job() {
    const usedAvatars = (await this.memberRepository.findAll())
      .map((member) => member.avatar)
      .filter((avatar) => avatar !== null)
      .map((avatar) => this.avatarService.extractKeyFromUrl(avatar));

    const savedAvatars = await this.avatarService.getKeys();

    const unusedAvatars = savedAvatars.filter((a) => !usedAvatars.includes(a));

    unusedAvatars.forEach((key) => this.avatarService.delete(key));

    this.eventEmitter.emit(
      PurgeUnusedAvatarEvent.EVENT_NAME,
      new PurgeUnusedAvatarEvent(unusedAvatars),
    );
  }
}
