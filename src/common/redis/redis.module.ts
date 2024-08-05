import { Module, DynamicModule } from '@nestjs/common';

import { RedisRepository } from './redis.repository';

@Module({})
export class RedisModule {
  static register(group: string): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'GROUP',
          useValue: group,
        },
        RedisRepository,
      ],
      exports: [RedisRepository],
    };
  }
}
