import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { MemberModule } from '../member/member.module';
import { RedisModule } from '../../utils/redis/redis.module';
import { MailModule } from '../../utils/mail/mail.module';

@Module({
  imports: [MemberModule, RedisModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
