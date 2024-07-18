import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MongoModel } from '../../utils/mongo/MongoModel';
import { Member, MemberSchema } from './member.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberRepository } from './member.repository';

@Module({
  imports: [MongooseModule.forFeatureAsync([MongoModel.generate(Member.name, MemberSchema)])],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberRepository],
})
export class MemberModule {}
