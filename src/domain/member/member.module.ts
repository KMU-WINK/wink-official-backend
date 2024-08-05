import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberAdminController, MemberController } from './controller';
import { MemberAdminService, MemberService } from './service';
import { MemberRepository } from './repository';
import { Member, MemberSchema } from './schema';

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
