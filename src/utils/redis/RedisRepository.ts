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

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async ttl(key: string, value: string, seconds: number): Promise<void> {
    await this.redisClient.setex(key, seconds, value);
  }

  async delete(key: string): Promise<boolean> {
    return (await this.redisClient.del(key)) === 1;
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redisClient.exists(key)) === 1;
  }
}
