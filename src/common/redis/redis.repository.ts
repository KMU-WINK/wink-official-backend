import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

@Injectable()
export class RedisRepository {
  private readonly logger: Logger = new Logger(RedisRepository.name);

  private readonly redisClient: Redis;

  constructor(configService: ConfigService) {
    this.redisClient = new Redis(
      configService.getOrThrow<number>('redis.port'),
      configService.getOrThrow<string>('redis.host'),
    );
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
    this.logger.log(`Set key: ${key}, value: ${value}`);
  }

  async ttl(key: string, value: string, seconds: number): Promise<void> {
    await this.redisClient.setex(key, seconds, value);
    this.logger.log(`Set key: ${key}, value: ${value}, seconds: ${seconds}`);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);

    this.logger.log(`Delete key: ${key}`);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redisClient.exists(key)) === 1;
  }
}
