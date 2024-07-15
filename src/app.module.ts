import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RequestLoggingMiddleware } from './utils/logger/RequestLoggingMiddleware';
import configuration from './utils/config/configuration';
import { MongooseConfigService } from './utils/mongo/MongooseConfigService';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),

    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [RequestLoggingMiddleware, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
