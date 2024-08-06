import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { RedisDeleteEvent, RedisSetEvent, RedisSetTtlEvent } from '../../type';

@Injectable()
export class RedisServiceEventListener {
  private readonly logger = new Logger(RedisServiceEventListener.name);

  @OnEvent(RedisSetEvent.EVENT_NAME)
  onSet({ key, value }: RedisSetEvent) {
    this.logger.log(`Set key ${key} with value ${value}`);
  }

  @OnEvent(RedisSetTtlEvent.EVENT_NAME)
  onSetTtl({ key, value, seconds }: RedisSetTtlEvent) {
    this.logger.log(`Set key ${key} with value ${value} and ttl ${seconds} seconds`);
  }

  @OnEvent(RedisDeleteEvent.EVENT_NAME)
  onDelete({ key }: RedisDeleteEvent) {
    this.logger.log(`Delete key ${key}`);
  }
}
