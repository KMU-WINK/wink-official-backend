import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from '../../utils/mail/mail.module';
import { RedisModule } from '../../utils/redis/redis.module';

@Module({
  imports: [MailModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
