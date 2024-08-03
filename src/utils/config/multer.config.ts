import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';

import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import * as multerS3 from 'multer-s3';

import { S3Provider } from '../s3/s3.provider';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly s3Provider: S3Provider,
  ) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multerS3['default']({
        s3: this.s3Provider.getS3Client(),
        bucket: this.configService.getOrThrow<string>('s3.bucket'),
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req: unknown, file: Express.Multer.File, callback: any) => {
          callback(null, uuid() + extname(file.originalname));
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
      },
    };
  }
}
