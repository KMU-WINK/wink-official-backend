import { Module } from '@nestjs/common';

import { AuthController } from './controller';
import { AuthService } from './service';

import { MemberModule } from '../member/member.module';

import { RedisModule, RedisService } from '../../common/redis';
import { MailModule } from '../../common/utils/mail';

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
