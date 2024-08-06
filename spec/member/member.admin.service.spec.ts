import { mockMember } from './member.mock';
import { createRandomMember, createRandomMembers } from './fake-members.mock';

import { Role } from '../../src/domain/member/constant';
import { MemberAdminService } from '../../src/domain/member/service';
import { Member } from '../../src/domain/member/schema';
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
    it('Empty members', async () => {
      // Given

      // When
      const result = memberAdminService.getWaitingMembers();

      // Then
      await expect(result).resolves.toStrictEqual([]);
    });

    it('Has members', async () => {
      // Given
      const members = createRandomMembers(5);
      const waitingMembers = createRandomMembers(5);

      memoryMemberRepository.push(
        ...waitingMembers.map((member) => ({ ...member, approved: false })),
        ...members.map((member) => ({ ...member, approved: true })),
      );

      // When
      const result = memberAdminService.getWaitingMembers();

      // Then
      await expect(result).resolves.toHaveLength(5);
    });
  });

  describe('approveWaitingMember', () => {
    it('NotWaitingMemberException', async () => {
      // Given
      const member = createRandomMember();
      member.approved = true;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.approveWaitingMember(member._id);

      // Then
      await expect(result).rejects.toThrow(NotWaitingMemberException);
    });

    it('Approve waiting member', async () => {
      // Given
      const member = createRandomMember();
      member.approved = false;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.approveWaitingMember(member._id);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].approved).toBe(true);
      expect(memoryMemberRepository[0].role).toBe(Role.MEMBER);
      expect(mailService.approveAccount).toHaveBeenCalledWith({ name: member.name });
    });
  });

  describe('rejectWaitingMember', () => {
    it('NotWaitingMemberException', async () => {
      // Given
      const member = createRandomMember();
      member.approved = true;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.rejectWaitingMember(member._id);

      // Then
      await expect(result).rejects.toThrow(NotWaitingMemberException);
    });

    it('Reject waiting member', async () => {
      // Given
      const member = createRandomMember();
      member.approved = false;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.rejectWaitingMember(member._id);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository).toHaveLength(0);
      expect(mailService.rejectAccount).toHaveBeenCalledWith({ name: member.name });
    });
  });

  describe('getMembers', () => {
    it('Empty members', async () => {
      // Given

      // When
      const result = memberAdminService.getMembers();

      // Then
      await expect(result).resolves.toStrictEqual([]);
    });

    it('Has Members', async () => {
      // Given
      const members = createRandomMembers(5);
      const waitingMembers = createRandomMembers(5);

      memoryMemberRepository.push(
        ...waitingMembers.map((member) => ({ ...member, approved: false })),
        ...members.map((member) => ({ ...member, approved: true })),
      );

      // When
      const result = memberAdminService.getMembers();

      // Then
      await expect(result).resolves.toHaveLength(5);
    });
  });

  describe('updateRole', () => {
    it('NotApprovedMemberException', async () => {
      // Given
      const member = createRandomMember();
      member.approved = false;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateRole(member._id, Role.PRESIDENT);

      // Then
      await expect(result).rejects.toThrow(NotApprovedMemberException);
    });

    it('Update role', async () => {
      // Given
      const member = createRandomMember();
      member.approved = true;
      member.role = Role.MEMBER;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateRole(member._id, Role.PRESIDENT);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].role).toBe(Role.PRESIDENT);
    });
  });

  describe('updateFee', () => {
    it('NotApprovedMemberException', async () => {
      // Given
      const member = createRandomMember();
      member.approved = false;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateFee(member._id, true);

      // Then
      await expect(result).rejects.toThrow(NotApprovedMemberException);
    });

    it('Change fee', async () => {
      // Given
      const member = createRandomMember();
      member.approved = true;
      member.fee = false;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateFee(member._id, true);

      // Then
      await expect(result).resolves.toBeUndefined();
      expect(memoryMemberRepository[0].fee).toBe(true);
    });
  });
});
