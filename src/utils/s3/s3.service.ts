import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v4 as uuid } from 'uuid';
import { extname } from 'path';

import {
  DeleteObjectCommand,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
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

  async upload(file: Express.Multer.File, directory: string) {
    const key = `${directory}/${uuid()}${extname(file.originalname)}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Key: key,
        Body: file.buffer,
        Bucket: this.configService.getOrThrow<string>('s3.bucket'),
        ContentType: file.mimetype,
        ACL: ObjectCannedACL.public_read,
      }),
    );

    return `https://${this.configService.getOrThrow<string>('s3.bucket')}.s3.${this.configService.getOrThrow<string>('s3.region')}.amazonaws.com/${key}`;
  }

  async delete(key: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Key: key,
        Bucket: this.configService.getOrThrow<string>('s3.bucket'),
      }),
    );
  }

  extractKey(url: string) {
    return url.split('.com/')[1];
  }
}
