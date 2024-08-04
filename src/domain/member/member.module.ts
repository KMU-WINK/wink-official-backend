import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { MemberAdminController } from './admin/member.admin.controller';
import { MemberAdminService } from './admin/member.admin.service';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member, MemberSchema } from './member.schema';
import { MemberRepository } from './member.repository';

import { MailModule, MongoModelFactory, MulterConfig, S3Module } from '../../utils';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([MongoModelFactory.generate(Member.name, MemberSchema)]),

    MulterModule.registerAsync({
      useClass: MulterConfig,
      imports: [S3Module],
    }),

    S3Module,

    MailModule,
  ],
  controllers: [MemberController, MemberAdminController],
  providers: [MemberService, MemberAdminService, MemberRepository],
  exports: [MemberRepository],
})
export class MemberModule {}
