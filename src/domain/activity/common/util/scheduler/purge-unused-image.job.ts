import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

import { ProjectRepository, SocialRepository } from '@wink/activity/repository';

import { S3Service } from '@wink/s3';

import { PurgeUnusedImageEvent } from '@wink/event';

import * as cheerio from 'cheerio';

@Injectable()
export class PurgeUnusedImageJob {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly socialRepository: SocialRepository,

    @Inject('S3_SERVICE_ACTIVITY') private readonly activityService: S3Service,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Timeout(0)
  async onTimeout() {
    await this.job();
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async onCron() {
    await this.job();
  }

  private async job() {
    const usedImages = [
      ...(await this.projectRepository.findAll())
        .map((project) => project.content)
        .flatMap((content) => this.toImagesFromHtml(content))
        .map((image) => this.activityService.extractKeyFromUrl(image)),
      ...(await this.projectRepository.findAll())
        .map((project) => project.image)
        .map((image) => this.activityService.extractKeyFromUrl(image)),
      ...(await this.socialRepository.findAll())
        .flatMap((social) => social.contents)
        .map((content) => content.image)
        .map((image) => this.activityService.extractKeyFromUrl(image)),
    ];

    const savedImages = await this.activityService.getKeys();

    const unusedImages = savedImages.filter((a) => !usedImages.includes(a));

    unusedImages.forEach((key) => this.activityService.delete(key));

    this.eventEmitter.emit(
      PurgeUnusedImageEvent.EVENT_NAME,
      new PurgeUnusedImageEvent(unusedImages),
    );
  }

  private toImagesFromHtml(html: string): string[] {
    const $ = cheerio.load(html);

    const images: string[] = [];
    $('img').each((_, elem) => {
      const src = $(elem).attr('src');

      if (src) {
        images.push(src);
      }
    });

    return images;
  }
}
