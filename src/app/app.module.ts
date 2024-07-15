import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../domain/auth/auth.module';
import { MemberModule } from '../domain/member/member.module';
import { ActivityModule } from '../domain/activity/activity.module';

import { RequestLoggingMiddleware } from '../utils/logger/RequestLoggingMiddleware';
import configuration from '../utils/config/configuration';
import { MongooseConfigService } from '../utils/mongo/MongooseConfigService';

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
  providers: [RequestLoggingMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
