import { Module } from '@nestjs/common';

import { RedisRepository } from './RedisRepository';

@Module({
  providers: [RedisRepository],
  exports: [RedisRepository],
})
export class RedisModule {}
