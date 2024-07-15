import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RequestLoggingMiddleware } from './utils/logger/RequestLoggingMiddleware';
import configuration from './utils/config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
  controllers: [AppController],
  providers: [RequestLoggingMiddleware, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
