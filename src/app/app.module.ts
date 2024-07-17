import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../domain/auth/auth.module';
import { MemberModule } from '../domain/member/member.module';
import { ActivityModule } from '../domain/activity/activity.module';

import { RequestLoggingMiddleware } from '../utils/logger/RequestLoggingMiddleware';
import { AuthMiddleware } from '../domain/auth/auth.middleware';

import { MongooseConfigService } from '../utils/mongo/MongooseConfigService';
import configuration from '../utils/config/configuration';

// test
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),

    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),

    AuthModule,
    MemberModule,
    ActivityModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
