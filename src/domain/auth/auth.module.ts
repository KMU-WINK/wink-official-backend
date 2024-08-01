import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { MemberModule } from '../member/member.module';

import { RedisModule, MailModule } from '../../utils';

@Module({
  imports: [MemberModule, RedisModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
