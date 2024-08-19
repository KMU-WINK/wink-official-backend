import { DynamicModule, Module } from '@nestjs/common';

import { S3Service } from './service';

export interface S3ModuleOptions {
  directory: string;
}

@Module({})
export class S3Module {
  static forRoot(options: S3ModuleOptions): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: 'S3_MODULE_OPTIONS_DIRECTORY',
          useValue: options.directory,
        },
        {
          provide: `S3_SERVICE_${options.directory.toUpperCase()}`,
          useClass: S3Service,
        },
      ],
      exports: [
        {
          provide: `S3_SERVICE_${options.directory.toUpperCase()}`,
          useClass: S3Service,
        },
      ],
    };
  }
}
