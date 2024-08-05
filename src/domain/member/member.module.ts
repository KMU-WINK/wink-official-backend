import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberAdminController, MemberController } from './controller';
import { MemberAdminService, MemberService } from './service';
import { MemberRepository } from './repository';
import { Member, MemberSchema } from './schema';

import { MongoModelFactory } from '../../common/mongo';
import { S3Module, S3Service } from '../../common/s3';
import { MailModule } from '../../common/utils/mail';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([MongoModelFactory.generate(Member.name, MemberSchema)]),

    S3Module.register('member'),

    MailModule,
  ],
  controllers: [MemberController, MemberAdminController],
  providers: [
    MemberService,
    MemberAdminService,
    MemberRepository,
    {
      provide: `${S3Service}-avatar`,
      useFactory: (s3Service: S3Service) => s3Service.sub('avatar'),
      inject: [S3Service],
    },
  ],
  exports: [MemberRepository],
})
export class MemberModule {}
