import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberAdminController, MemberController } from '@wink/member/controller';
import { MemberAdminService, MemberService } from '@wink/member/service';
import { Member, MemberSchema } from '@wink/member/schema';
import { MemberRepository } from '@wink/member/repository';
import { PurgeUnusedAvatarJob } from '@wink/member/util/scheduler';

import { MongoModelFactory } from '@wink/mongo';
import { S3Module, S3Service } from '@wink/s3';
import { MailModule } from '@wink/mail';

const modelFactory = MongoModelFactory.generate<Member>(Member.name, MemberSchema);

@Module({
  imports: [MongooseModule.forFeatureAsync([modelFactory]), S3Module, MailModule],
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
