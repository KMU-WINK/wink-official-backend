import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppConfig, JwtConfig, MongoConfig } from '@wink/config';
import { DefaultExceptionFilter, NotFoundExceptionFilter } from '@wink/filter';
import { ApiResponseInterceptor } from '@wink/interceptor';

import { AuthModule } from '@wink/auth/auth.module';
import { MemberModule } from '@wink/member/member.module';
import { ActivityModule } from '@wink/activity/activity.module';

import { EventListenerModule } from '@wink/event';
import { Validation } from '@wink/validation';

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

    EventEmitterModule.forRoot(),
    EventListenerModule,

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
