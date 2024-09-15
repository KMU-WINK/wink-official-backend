import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberAdminController, MemberController } from '@wink/member/controller';
import { MemberRepository } from '@wink/member/repository';
import { Member, MemberSchema } from '@wink/member/schema';
import { MemberAdminService, MemberService } from '@wink/member/service';
import { PurgeUnusedAvatarJob } from '@wink/member/util/scheduler';

import { MongoModelFactory } from '@wink/mongo';
import { S3Module } from '@wink/s3';

import { MailModule } from '@wink/mail';

const modelFactory = MongoModelFactory.generate<Member>(Member.name, MemberSchema);

@Module({
    MongooseModule.forFeature([modelFactory]),
    S3Module.forRoot({ directory: 'avatar' }),
    MailModule,
  ],
  controllers: [MemberController, MemberAdminController],
  providers: [MemberService, MemberAdminService, MemberRepository, PurgeUnusedAvatarJob],
  exports: [MemberRepository],
})
export class MemberModule {}
