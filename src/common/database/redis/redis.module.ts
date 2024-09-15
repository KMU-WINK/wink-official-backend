import { DynamicModule, Module } from '@nestjs/common';
import { RedisService } from './service';

export interface RedisModuleOptions {
  group: string;
}

@Module({})
export class RedisModule {
  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'REDIS_MODULE_OPTIONS_GROUP',
          useValue: options.group,
        },
        {
          provide: `REDIS_SERVICE_${options.group.toUpperCase()}`,
          useClass: RedisService,
        },
      ],
      exports: [
        {
          provide: `REDIS_SERVICE_${options.group.toUpperCase()}`,
          useClass: RedisService,
        },
      ],
    };
  }
}
