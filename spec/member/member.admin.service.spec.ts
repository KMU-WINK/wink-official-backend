import { MemberAdminService } from '../../src/domain/member/service';
import { Member } from '../../src/domain/member/schema';
import { mockMember } from './member.mock';
import { generateMember, generateMembers } from './fake-members.mock';
import { Role } from '../../src/domain/member/constant';
import { MailService } from '../../src/common/utils/mail';
import {
  NotApprovedMemberException,
  NotWaitingMemberException,
} from '../../src/domain/member/exception';

describe('Member Admin Service Test', () => {
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

  describe('대기 중인 부원 조회', () => {
    it('대기 중인 부원이 없는 경우', async () => {
      // Given

      // When
      const result = memberAdminService.getWaitingMembers();

      // Then
      await expect(result).resolves.toStrictEqual([]);
    });

    it('대기 중인 부원이 있는 경우', async () => {
      // Given
      const members = generateMembers(5);
      const waitingMembers = generateMembers(5);

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

  describe('대기 중인 부원 승인', () => {
    it('부원이 이미 승인된 경우', async () => {
      // Given
      const member = generateMember();
      member.approved = true;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.approveWaitingMember(member._id);

      // Then
      await expect(result).rejects.toThrow(NotWaitingMemberException);
    });

    it('대기 중인 부원을 승인하는 경우', async () => {
      // Given
      const member = generateMember();
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

  describe('대기 중인 부원 거절', () => {
    it('부원이 이미 승인된 경우', async () => {
      // Given
      const member = generateMember();
      member.approved = true;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.rejectWaitingMember(member._id);

      // Then
      await expect(result).rejects.toThrow(NotWaitingMemberException);
    });

    it('대기 중인 부원을 거절하는 경우', async () => {
      // Given
      const member = generateMember();
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

  describe('부원 목록 조회', () => {
    it('승인된 부원이 없는 경우', async () => {
      // Given

      // When
      const result = memberAdminService.getMembers();

      // Then
      await expect(result).resolves.toStrictEqual([]);
    });

    it('승인된 부원이 있는 경우', async () => {
      // Given
      const members = generateMembers(5);
      const waitingMembers = generateMembers(5);

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

  describe('부원 역할 수정', () => {
    it('부원이 승인되지 않은 경우', async () => {
      // Given
      const member = generateMember();
      member.approved = false;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateRole(member._id, Role.PRESIDENT);

      // Then
      await expect(result).rejects.toThrow(NotApprovedMemberException);
    });

    it('부원 역할을 수정하는 경우', async () => {
      // Given
      const member = generateMember();
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

  describe('부원 회비 납부 여부 수정', () => {
    it('부원이 승인되지 않은 경우', async () => {
      // Given
      const member = generateMember();
      member.approved = false;

      memoryMemberRepository.push(member);

      // When
      const result = memberAdminService.updateFee(member._id, true);

      // Then
      await expect(result).rejects.toThrow(NotApprovedMemberException);
    });

    it('부원 회비 납부 여부를 수정하는 경우', async () => {
      // Given
      const member = generateMember();
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
