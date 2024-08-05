import { Module } from '@nestjs/common';

import { AuthController } from './controller';
import { AuthService } from './service';

import { MemberModule } from '../member/member.module';

import { RedisModule } from '../../common/redis';
import { MailModule } from '../../common/utils/mail';

@Module({
  imports: [MemberModule, RedisModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
