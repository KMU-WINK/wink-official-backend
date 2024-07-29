import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../domain/auth/auth.module';
import { MemberModule } from '../domain/member/member.module';
import { ActivityModule } from '../domain/activity/activity.module';

import { RequestLoggingMiddleware } from '../utils/logger/RequestLoggingMiddleware';

import { MongooseConfigService } from '../utils/mongo/MongooseConfigService';
import { JwtConfigService } from '../utils/jwt/JwtConfigService';
import configuration from '../utils/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),

    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),

    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfigService,
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
  }
}
