import { mockMember } from './member.mock';
import { createRandomMember, createRandomMembers } from './fake-members.mock';

import { Role } from '../../src/domain/member/constant';
import { MemberAdminService } from '../../src/domain/member/service';
import { Member } from '../../src/domain/member/schema';
import {
  ApproveWaitingMemberRequestDto,
  RejectWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
} from '../../src/domain/member/dto';
import {
  NotApprovedMemberException,
  NotWaitingMemberException,
} from '../../src/domain/member/exception';

import { MailService } from '../../src/common/utils/mail';

describe('MemberAdminService', () => {
  let memberAdminService: MemberAdminService;
  let mailService: MailService;

  let memoryMemberRepository: Member[];

  beforeAll(async () => {
    const mock = await mockMember();

    const { module } = mock;
    ({ memoryMemberRepository } = mock);

    memberAdminService = module.get<MemberAdminService>(MemberAdminService);
    mailService = module.get<MailService>(MailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    memoryMemberRepository.splice(0, memoryMemberRepository.length);
  });

  describe('getWaitingMembers', () => {
    const MEMBERS: Member[] = [
      ...createRandomMembers(5).map((member) => ({ ...member, approved: false })),
      ...createRandomMembers(5).map((member) => ({ ...member, approved: true })),
    ];

    it('Empty members', async () => {
      // Given

      // When
      const result = memberAdminService.getWaitingMembers();

      // Then
      await expect(result).resolves.toStrictEqual({ members: [] });
    });

    it('Has members', async () => {
      // Given
      memoryMemberRepository.push(...MEMBERS);

      // When
      const result = memberAdminService.getWaitingMembers();

      // Then
      await expect(result).resolves.toBeInstanceOf(Object);
    });
  });

  describe('approveWaitingMember', () => {
    const MEMBER = createRandomMember();
    MEMBER.approved = false;

    const PARAM: ApproveWaitingMemberRequestDto = {
      memberId: MEMBER._id,
    };

    it('NotWaitingMemberException', async () => {
      // Given
      const member = { ...MEMBER };
      member.approved = true;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.approveWaitingMember(PARAM);

      // Then
      await expect(result).rejects.toThrow(NotWaitingMemberException);
    });

    it('Approve waiting member', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.approveWaitingMember(PARAM);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].approved).toBe(true);
      expect(memoryMemberRepository[0].role).toBe(Role.MEMBER);
      expect(mailService.approveAccount).toHaveBeenCalledWith({ name: member.name });
    });
  });

  describe('rejectWaitingMember', () => {
    const MEMBER = createRandomMember();
    MEMBER.approved = false;

    const PARAM: RejectWaitingMemberRequestDto = {
      memberId: MEMBER._id,
    };

    it('NotWaitingMemberException', async () => {
      // Given
      const member = { ...MEMBER };
      member.approved = true;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.rejectWaitingMember(PARAM);

      // Then
      await expect(result).rejects.toThrow(NotWaitingMemberException);
    });

    it('Reject waiting member', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.rejectWaitingMember(PARAM);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository).toHaveLength(0);
      expect(mailService.rejectAccount).toHaveBeenCalledWith({ name: member.name });
    });
  });

  describe('getMembers', () => {
    const MEMBERS: Member[] = [
      ...createRandomMembers(5).map((member) => ({ ...member, approved: false })),
      ...createRandomMembers(5).map((member) => ({ ...member, approved: true })),
    ];

    it('Empty members', async () => {
      // Given

      // When
      const result = memberAdminService.getMembers();

      // Then
      await expect(result).resolves.toStrictEqual({ members: [] });
    });

    it('Has Members', async () => {
      // Given
      memoryMemberRepository.push(...MEMBERS);

      // When
      const result = memberAdminService.getMembers();

      // Then
      await expect(result).resolves.toBeInstanceOf(Object);
    });
  });

  describe('updateRole', () => {
    const MEMBER = createRandomMember();
    MEMBER.approved = true;
    MEMBER.role = Role.MEMBER;

    const PARAM: UpdateMemberRoleRequestDto = {
      memberId: MEMBER._id,
      role: Role.PRESIDENT,
    };

    it('NotApprovedMemberException', async () => {
      // Given
      const member = { ...MEMBER };
      member.approved = false;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateRole(PARAM);

      // Then
      await expect(result).rejects.toThrow(NotApprovedMemberException);
    });

    it('Update role', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateRole(PARAM);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].role).toBe(Role.PRESIDENT);
    });
  });

  describe('updateFee', () => {
    const MEMBER = createRandomMember();
    MEMBER.approved = true;
    MEMBER.fee = false;

    const PARAM: UpdateMemberFeeRequestDto = {
      memberId: MEMBER._id,
      fee: true,
    };

    it('NotApprovedMemberException', async () => {
      // Given
      const member = { ...MEMBER };
      member.approved = false;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateFee(PARAM);

      // Then
      await expect(result).rejects.toThrow(NotApprovedMemberException);
    });

    it('Change fee', async () => {
      // Given
      const member = { ...MEMBER };

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateFee(PARAM);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].fee).toBe(true);
    });
  });
});
