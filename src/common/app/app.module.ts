import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from '../../domain/auth/auth.module';
import { MemberModule } from '../../domain/member/member.module';
import { ActivityModule } from '../../domain/activity/activity.module';

import { AppConfig, JwtConfig, MongoConfig } from '../config';
import { ApiResponseInterceptor } from '../interceptor';
import { DefaultExceptionFilter, NotFoundExceptionFilter } from '../filter';

import { Validation } from '../utils/validation';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [AppConfig], isGlobal: true }),

    MongooseModule.forRootAsync({
      useClass: MongoConfig,
    }),

    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfig,
    }),

    ScheduleModule.forRoot(),

    AuthModule,
    MemberModule,
    ActivityModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: Validation.getValidationPipe(),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: DefaultExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
  controllers: [],
})
export class AppModule {}
