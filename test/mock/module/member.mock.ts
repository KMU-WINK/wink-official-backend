import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { MemberAdminController, MemberController } from '@wink/member/controller';
import { MemberRepository } from '@wink/member/repository';
import { Member } from '@wink/member/schema';
import { MemberAdminService, MemberService } from '@wink/member/service';

import { MailService } from '@wink/mail';

import { mockMailService, mockMemberRepository, mockS3Service } from '@wink/test-mock';

export const mockMember = async () => {
  const memoryMemberRepository: Member[] = [];

  const module = await Test.createTestingModule({
    imports: [
      JwtModule.register({
        secret: 'jwt_secret_for_test',
        signOptions: { expiresIn: '1h' },
      }),
      EventEmitterModule.forRoot(),
    ],
    controllers: [MemberController, MemberAdminController],
    providers: [
      MemberService,
      MemberAdminService,
      { provide: MemberRepository, useValue: mockMemberRepository(memoryMemberRepository) },
      { provide: MailService, useValue: mockMailService() },
      { provide: 'S3_SERVICE_AVATAR', useValue: mockS3Service() },
    ],
  }).compile();

  return {
    module,
    memoryMemberRepository,
  };
};
