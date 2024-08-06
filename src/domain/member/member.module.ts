import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberAdminController, MemberController } from '@wink/member/controller';
import { MemberAdminService, MemberService } from '@wink/member/service';
import { MemberRepository } from '@wink/member/repository';
import { Member, MemberSchema } from '@wink/member/schema';

import { PurgeUnusedAvatarJob } from '@wink/member/util/scheduler';

import { MongoModelFactory } from '@wink/mongo';
import { S3Module, S3Service } from '@wink/s3';
import { MailModule } from '@wink/mail';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([MongoModelFactory.generate<Member>(Member.name, MemberSchema)]),

    S3Module.register('member'),

    MailModule,
  ],
  controllers: [MemberController, MemberAdminController],
  providers: [
    MemberService,
    MemberAdminService,
    MemberRepository,
    PurgeUnusedAvatarJob,
    {
      provide: `${S3Service}-avatar`,
      useFactory: (s3Service: S3Service) => s3Service.sub('avatar'),
      inject: [S3Service],
    },
  ],
  exports: [MemberRepository],
})
export class MemberModule {}
