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
    private readonly eventEmitter: EventEmitter2,
    @Inject(`${S3Service}-avatar`) private readonly s3AvatarService: S3Service,
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
      .map((avatar) => this.s3AvatarService.extractKeyFromUrl(avatar));

    const savedAvatars = await this.s3AvatarService.getKeys();

    const unusedAvatars = savedAvatars.filter((a) => !usedAvatars.includes(a));

    unusedAvatars.forEach((key) => this.s3AvatarService.delete(key).then((_) => _));

    this.eventEmitter.emit(
      PurgeUnusedAvatarEvent.EVENT_NAME,
      new PurgeUnusedAvatarEvent(unusedAvatars),
    );
  }
}
