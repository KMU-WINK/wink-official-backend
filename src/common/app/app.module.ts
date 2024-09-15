import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from '@wink/auth/auth.module';

import { MemberModule } from '@wink/member/member.module';

import { ActivityModule } from '@wink/activity/activity.module';

import { AppConfig, JwtConfig, MongoConfig } from '@wink/config';
import { DefaultExceptionFilter, NotFoundExceptionFilter } from '@wink/filter';
import { ApiResponseInterceptor } from '@wink/interceptor';

import { EventListenerModule } from '@wink/event';
import { Validation } from '@wink/validation';

const configOptions: ConfigModuleOptions = { isGlobal: true, load: [AppConfig] };
const mongooseOptions: MongooseModuleAsyncOptions = { useClass: MongoConfig };
const jwtOptions: JwtModuleAsyncOptions = { global: true, useClass: JwtConfig };

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongooseOptions),
    JwtModule.registerAsync(jwtOptions),
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
