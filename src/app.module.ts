import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RequestLoggingMiddleware } from './utils/logger/RequestLoggingMiddleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RequestLoggingMiddleware, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
