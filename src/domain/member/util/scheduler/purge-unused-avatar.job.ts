import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { MemberRepository } from '../../repository';
import { S3Service } from '../../../../common/s3';

@Injectable()
export class PurgeUnusedAvatarJob {
  private readonly logger = new Logger(PurgeUnusedAvatarJob.name);

  constructor(
    private readonly memberRepository: MemberRepository,
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
      .filter((avatar) => avatar)
      .map((avatar) => avatar.split('.com/')[1])
      .map((key) => key.split('/').pop());

    const savedAvatars = (await this.s3AvatarService.getFiles()).map((key) => key.split('/').pop());

    const unusedAvatars = savedAvatars.filter((a) => !usedAvatars.includes(a));

    this.logger.log(`Found ${unusedAvatars.length} unused avatars`);

    unusedAvatars.forEach((key) => this.s3AvatarService.delete(key).then((_) => _));
  }
}
