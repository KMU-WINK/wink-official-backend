import { Module } from '@nestjs/common';

import { AuthController } from '@wink/auth/controller';
import { AuthService } from '@wink/auth/service';

import { MemberModule } from '@wink/member/member.module';

import { RedisModule, RedisService } from '@wink/redis';
import { MailModule } from '@wink/mail';

@Module({
  imports: [MemberModule, MailModule, RedisModule.register('auth')],
  controllers: [AuthController],
  providers: [
    {
      provide: `${RedisService.name}-code`,
      useFactory: (repository: RedisService) => repository.sub('code'),
      inject: [RedisService],
    },
    {
      provide: `${RedisService.name}-token`,
      useFactory: (repository: RedisService) => repository.sub('token'),
      inject: [RedisService],
    },
    AuthService,
  ],
})
export class AuthModule {}
