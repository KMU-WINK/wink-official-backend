import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

@Injectable()
export class RedisRepository {
  private readonly logger: Logger;

  private readonly redisClient: Redis;

  constructor(
    private readonly configService: ConfigService,
    @Inject('GROUP') private readonly group: string,
  ) {
    this.logger = new Logger(`RedisRepository-${group}`);

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
    this.logger.log(`Set key: ${key}, value: ${value}`);
  }

  async ttl(key: string, value: string, seconds: number): Promise<void> {
    await this.redisClient.setex(this.#generateKey(key), seconds, value);
    this.logger.log(`Set key: ${key}, value: ${value}, seconds: ${seconds}`);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(this.#generateKey(key));

    this.logger.log(`Delete key: ${key}`);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redisClient.exists(this.#generateKey(key))) === 1;
  }

  #generateKey(key: string): string {
    return `${this.group}:${key}`;
  }

  sub(key: string): RedisRepository {
    return new RedisRepository(this.configService, `${this.group}:${key}`);
  }
}
