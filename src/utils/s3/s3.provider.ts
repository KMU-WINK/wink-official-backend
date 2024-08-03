import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Provider {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: configService.getOrThrow<string>('s3.region'),
      credentials: {
        accessKeyId: configService.getOrThrow<string>('s3.credentials.accessKey'),
        secretAccessKey: configService.getOrThrow<string>('s3.credentials.secretKey'),
      },
    });
  }

  getS3Client(): S3Client {
    return this.s3Client;
  }
}
