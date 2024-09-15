import { Module } from '@nestjs/common';

import { AuthController } from '@wink/auth/controller';
import { AuthService } from '@wink/auth/service';

import { MemberModule } from '@wink/member/member.module';

import { RedisModule } from '@wink/redis';

import { MailModule } from '@wink/mail';

@Module({
  imports: [
    MemberModule,
    MailModule,
    RedisModule.forRoot({ group: 'verify_code' }),
    RedisModule.forRoot({ group: 'verify_token' }),
    RedisModule.forRoot({ group: 'refresh_token' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
