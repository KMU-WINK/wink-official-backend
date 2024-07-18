import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisRepository {
  private readonly redisClient: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redisClient = new Redis(
      this.configService.getOrThrow<number>('redis.port'),
      this.configService.getOrThrow<string>('redis.host'),
    );
  }

  async get(key: string) {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string) {
    return this.redisClient.set(key, value);
  }

  async setex(key: string, value: string, seconds: number) {
    return this.redisClient.setex(key, seconds, value);
  }

  async delete(key: string) {
    return this.redisClient.del(key);
  }

  async exists(key: string) {
    return this.redisClient.exists(key);
  }
}
