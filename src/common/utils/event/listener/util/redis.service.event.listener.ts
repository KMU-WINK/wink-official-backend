import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { RedisDeleteEvent, RedisSetEvent, RedisSetTtlEvent } from '../../type';

@Injectable()
export class RedisServiceEventListener {
  private readonly logger = new Logger(RedisServiceEventListener.name);

  @OnEvent(RedisSetEvent.EVENT_NAME)
  onSet({ key, value }: RedisSetEvent) {
    this.logger.log(`RedisSetEvent: { key: ${key}, value: ${value} }`);
  }

  @OnEvent(RedisSetTtlEvent.EVENT_NAME)
  onSetTtl({ key, value, seconds }: RedisSetTtlEvent) {
    this.logger.log(`RedisSetTtlEvent: { key: ${key}, value: ${value}, seconds: ${seconds} }`);
  }

  @OnEvent(RedisDeleteEvent.EVENT_NAME)
  onDelete({ key }: RedisDeleteEvent) {
    this.logger.log(`RedisDeleteEvent: { key: ${key} }`);
  }
}
