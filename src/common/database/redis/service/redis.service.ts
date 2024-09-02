import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { RedisDeleteEvent, RedisSetEvent, RedisSetTtlEvent } from '@wink/event';

import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(
    configService: ConfigService,

    private readonly eventEmitter: EventEmitter2,

    @Inject('REDIS_MODULE_OPTIONS_GROUP') private readonly group: string,
  ) {
    this.redisClient = new Redis(
      configService.getOrThrow<number>('redis.port'),
      configService.getOrThrow<string>('redis.host'),
      {
        password: configService.get<string>('redis.password'),
      },
    );
  }

  async get(key: string): Promise<string | null> {
    if (!this.group) throw new Error('Group is not set');

    const _key = this.#generateKey(key);

    return this.redisClient.get(_key);
  }

  async set(key: string, value: string): Promise<void> {
    if (!this.group) throw new Error('Group is not set');

    const _key = this.#generateKey(key);

    await this.redisClient.set(_key, value);

    this.eventEmitter.emit(RedisSetEvent.EVENT_NAME, new RedisSetEvent(_key, value));
  }

  async ttl(key: string, value: string, seconds: number): Promise<void> {
    if (!this.group) throw new Error('Group is not set');

    const _key = this.#generateKey(key);

    await this.redisClient.setex(_key, seconds, value);

    this.eventEmitter.emit(RedisSetTtlEvent.EVENT_NAME, new RedisSetTtlEvent(_key, value, seconds));
  }

  async delete(key: string): Promise<void> {
    if (!this.group) throw new Error('Group is not set');

    const _key = this.#generateKey(key);

    await this.redisClient.del(_key);

    this.eventEmitter.emit(RedisDeleteEvent.EVENT_NAME, new RedisDeleteEvent(_key));
  }

  #generateKey(key: string): string {
    if (!this.group) throw new Error('Group is not set');

    return `${this.group}:${key}`;
  }
}
