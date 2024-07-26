import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.buildConnectionString(),
    };
  }

  private buildConnectionString(): string {
    const host = this.configService.getOrThrow<string>('mongo.host');
    const port = this.configService.getOrThrow<number>('mongo.port');
    const username = this.configService.getOrThrow<string>('mongo.username');
    const password = this.configService.getOrThrow<string>('mongo.password');
    const authSource = this.configService.getOrThrow<string>('mongo.authSource');
    const database = this.configService.getOrThrow<string>('mongo.database');

    let connectionString = 'mongodb://';

    if (username && password) {
      connectionString += `${username}:${password}@`;
    }

    connectionString += `${host}:${port}/${database}`;

    if (authSource) {
      connectionString += `?authSource=${authSource}`;
    }

    return connectionString;
  }
}
