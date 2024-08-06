import { DynamicModule, Module } from '@nestjs/common';

import { RedisService } from './service';

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
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
