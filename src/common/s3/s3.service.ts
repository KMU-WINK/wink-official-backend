import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v4 as uuid } from 'uuid';
import { extname } from 'path';

import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private readonly logger: Logger;

  private readonly s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService,
    @Inject('DIRECTORY') private readonly directory: string,
  ) {
    this.logger = new Logger(`S3Service-${directory}`);

    this.s3Client = new S3Client({
      region: configService.getOrThrow<string>('s3.region'),
      credentials: {
        accessKeyId: configService.getOrThrow<string>('s3.credentials.accessKey'),
        secretAccessKey: configService.getOrThrow<string>('s3.credentials.secretKey'),
      },
    });
  }

  async upload(file: Express.Multer.File): Promise<string> {
    let _key = `${this.directory}/${uuid()}${extname(file.originalname)}`;
    _key = _key.replace(/ /g, '_');
    _key = _key.replace(/\/\//g, '/');

    await this.s3Client.send(
      new PutObjectCommand({
        Key: _key,
        Body: file.buffer,
        Bucket: this.configService.getOrThrow<string>('s3.bucket'),
        ContentType: file.mimetype,
        ACL: ObjectCannedACL.public_read,
      }),
    );

    this.logger.log(`Upload file: ${_key}`);

    return `https://${this.configService.getOrThrow<string>('s3.bucket')}.s3.${this.configService.getOrThrow<string>('s3.region')}.amazonaws.com/${_key}`;
  }

  async delete(key: string): Promise<void> {
    const _key = `${this.directory}/${key}`;

    await this.s3Client.send(
      new DeleteObjectCommand({
        Key: _key,
        Bucket: this.configService.getOrThrow<string>('s3.bucket'),
      }),
    );

    this.logger.log(`Delete file: ${_key}`);
  }

  async getKeys(): Promise<string[]> {
    const { Contents: files } = await this.s3Client.send(
      new ListObjectsV2Command({
        Prefix: this.directory,
        Bucket: this.configService.getOrThrow<string>('s3.bucket'),
      }),
    );

    return files.map((files) => files.Key).map((key) => key.substring(this.directory.length + 1));
  }

  extractKeyFromUrl(url: string): string {
    return url.split(`.com/`)[1].substring(this.directory.length + 1);
  }

  sub(directory: string): S3Service {
    return new S3Service(this.configService, `${this.directory}/${directory}`);
  }
}
