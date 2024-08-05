import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberAdminController } from './admin/member.admin.controller';
import { MemberAdminService } from './admin/member.admin.service';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member, MemberSchema } from './member.schema';
import { MemberRepository } from './member.repository';

import { MongoModelFactory } from '../../common/mongo';
import { S3Module } from '../../common/s3';
import { MailModule } from '../../common/utils/mail';

@Module({
  controllers: [MemberController, MemberAdminController],
  exports: [MemberRepository],
  imports: [
    MongooseModule.forFeatureAsync([MongoModelFactory.generate(Member.name, MemberSchema)]),

    S3Module,

    MailModule,
  ],
  providers: [MemberService, MemberAdminService, MemberRepository],
})
export class MemberModule {}
