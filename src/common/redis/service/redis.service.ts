import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

import Redis from 'ioredis';

import { RedisDeleteEvent, RedisSetEvent, RedisSetTtlEvent } from '@wink/event';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
    @Inject('GROUP') private readonly group: string,
  ) {
    this.redisClient = new Redis(
      configService.getOrThrow<number>('redis.port'),
      configService.getOrThrow<string>('redis.host'),
    );
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(this.#generateKey(key));
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(this.#generateKey(key), value);

    this.eventEmitter.emit(RedisSetEvent.EVENT_NAME, new RedisSetEvent(key, value));
  }

  async ttl(key: string, value: string, seconds: number): Promise<void> {
    await this.redisClient.setex(this.#generateKey(key), seconds, value);

    this.eventEmitter.emit(RedisSetTtlEvent.EVENT_NAME, new RedisSetTtlEvent(key, value, seconds));
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(this.#generateKey(key));

    this.eventEmitter.emit(RedisDeleteEvent.EVENT_NAME, new RedisDeleteEvent(key));
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redisClient.exists(this.#generateKey(key))) === 1;
  }

  #generateKey(key: string): string {
    return `${this.group}:${key}`;
  }

  sub(key: string): RedisService {
    return new RedisService(this.configService, this.eventEmitter, `${this.group}:${key}`);
  }
}
