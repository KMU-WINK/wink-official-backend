import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongoConfig implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const host = this.configService.getOrThrow<string>('mongo.host');
    const port = this.configService.getOrThrow<number>('mongo.port');
    const username = this.configService.get<string>('mongo.username');
    const password = this.configService.get<string>('mongo.password');
    const authSource = this.configService.get<string>('mongo.authSource');
    const database = this.configService.getOrThrow<string>('mongo.database');

    return {
      uri: this.buildConnectionString(host, port, username, password, authSource, database),
    };
  }

  private buildConnectionString(
    host: string,
    port: number,
    username: string | undefined,
    password: string | undefined,
    authSource: string | undefined,
    database: string,
  ): string {
    return 'mongodb://${credential}${host}/${database}${otherOptions}'
      .replace('${credential}', username && password ? `${username}:${password}@` : '')
      .replace('${host}', `${host}:${port}`)
      .replace('${database}', database)
      .replace('${otherOptions}', authSource ? `?authSource=${authSource}` : '');
  }
}
