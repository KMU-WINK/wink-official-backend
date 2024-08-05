import { DynamicModule, Module } from '@nestjs/common';

import { S3Service } from './s3.service';

@Module({})
export class S3Module {
  static register(directory: string): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: 'DIRECTORY',
          useValue: directory,
        },
        S3Service,
      ],
      exports: [S3Service],
    };
  }
}
