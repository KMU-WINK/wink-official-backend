import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member, MemberSchema } from './member.schema';
import { MemberRepository } from './member.repository';

import { MongoModelFactory } from '../../utils';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([MongoModelFactory.generate(Member.name, MemberSchema)]),
  ],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberRepository],
})
export class MemberModule {}
