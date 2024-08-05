import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { mockMailService, mockMemberRepository, mockS3Service } from '../mock';

import { MemberAdminController, MemberController } from '../../src/domain/member/controller';
import { MemberAdminService, MemberService } from '../../src/domain/member/service';
import { MemberRepository } from '../../src/domain/member/repository';
import { Member } from '../../src/domain/member/schema';

import { S3Service } from '../../src/common/s3';
import { MailService } from '../../src/common/utils/mail';

export const mockMember = async () => {
  const memoryMemberRepository: Member[] = [];

  const module = await Test.createTestingModule({
    imports: [
      JwtModule.register({
        secret: 'jwt_secret_for_test',
        signOptions: { expiresIn: '1h' },
      }),
    ],
    controllers: [MemberController, MemberAdminController],
    providers: [
      MemberService,
      MemberAdminService,
      { provide: MemberRepository, useValue: mockMemberRepository(memoryMemberRepository) },
      { provide: MailService, useValue: mockMailService() },
      {
        provide: `${S3Service}-avatar`,
        useValue: mockS3Service(),
      },
    ],
  }).compile();

  return {
    module,
    memoryMemberRepository,
  };
};
