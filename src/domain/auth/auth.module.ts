import { Module } from '@nestjs/common';

import { AuthController } from './controller';
import { AuthService } from './service';

import { MemberModule } from '../member/member.module';

import { RedisModule, RedisRepository } from '../../common/redis';
import { MailModule } from '../../common/utils/mail';

@Module({
  imports: [MemberModule, MailModule, RedisModule.register('auth')],
  controllers: [AuthController],
  providers: [
    {
      provide: `${RedisRepository.name}-code`,
      useFactory: (repository: RedisRepository) => repository.sub('code'),
      inject: [RedisRepository],
    },
    {
      provide: `${RedisRepository.name}-token`,
      useFactory: (repository: RedisRepository) => repository.sub('token'),
      inject: [RedisRepository],
    },
    AuthService,
  ],
})
export class AuthModule {}
