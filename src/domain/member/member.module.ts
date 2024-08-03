import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { MemberController } from './member.controller';
import { MemberAdminController } from './member.admin.controller';
import { MemberService } from './member.service';

import { Member, MemberSchema } from './member.schema';
import { MemberRepository } from './member.repository';

import { MongoModelFactory, MulterConfig, S3Module } from '../../utils';

/**
 * 프론트에 물어볼 것
 *
 * 1. 회원가입 시 이름도 입력받아야 합니다.
 *
 * 2. 비밀번호 변경이 따로 있나요?
 *
 * 3. 역할에 어드민 페이지는 임원진이라 되어있는데,
 *    부원 목록에는 임원진이 세부적으로(총무부, 홍보부, 기획부) 나눠져있습니다. (뭐로 통일할까요?)
 *
 * 4. 이메일 폼 필요합니다. (정적 페이지) - 인증코드, 회원가입 완료, 회원가입 승인, 회원가입 거절
 */
@Module({
  imports: [
    MongooseModule.forFeatureAsync([MongoModelFactory.generate(Member.name, MemberSchema)]),

    MulterModule.registerAsync({
      useClass: MulterConfig,
      imports: [S3Module],
    }),
  ],
  controllers: [MemberController, MemberAdminController],
  providers: [MemberService, MemberRepository],
  exports: [MemberRepository],
})
export class MemberModule {}
