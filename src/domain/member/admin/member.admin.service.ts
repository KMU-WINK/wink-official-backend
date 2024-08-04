import { Injectable } from '@nestjs/common';

import { MemberRepository } from '../member.repository';

import { EachGetMembersForAdminResponseDto, EachGetWaitingMembersResponseDto } from '../dto';

import { NotApprovedMemberException, NotWaitingMemberException } from '../exception';

import { Role } from '../constant/Role';

import { MailService } from '../../../utils';

@Injectable()
export class MemberAdminService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly mailService: MailService,
  ) {}

  async getWaitingMembers(): Promise<EachGetWaitingMembersResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return members
      .filter((member) => member.role == Role.WAITING)
      .map(
        (member) =>
          ({
            name: member.name,
            studentId: member.studentId,
          }) as EachGetWaitingMembersResponseDto,
      ) as EachGetWaitingMembersResponseDto[];
  }

  async approveWaitingMember(memberId: string): Promise<void> {
    const { name, email, role } = await this.memberRepository.findById(memberId);

    if (role !== Role.WAITING) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.updateRoleById(memberId, Role.MEMBER);

    this.mailService.approveAccount({ name }).send(email);
  }

  async refuseWaitingMember(memberId: string): Promise<void> {
    const { name, email, role } = await this.memberRepository.findById(memberId);

    if (role !== Role.WAITING) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.deleteById(memberId);

    this.mailService.refuseAccount({ name }).send(email);
  }

  async getMembers(): Promise<EachGetMembersForAdminResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return members
      .filter((member) => member.role !== Role.WAITING)
      .map(
        (member) =>
          ({
            memberId: member['_id'],
            name: member.name,
            avatar: member.avatar,
            description: member.description,
            link: member.link,
            role: member.role,
            studentId: member.studentId,
            fee: member.fee,
          }) as EachGetMembersForAdminResponseDto,
      ) as EachGetMembersForAdminResponseDto[];
  }

  async updateRole(memberId: string, role: Role): Promise<void> {
    const { role: _role } = await this.memberRepository.findById(memberId);

    if (_role === Role.WAITING) {
      throw new NotApprovedMemberException();
    }

    await this.memberRepository.updateRoleById(memberId, role);
  }

  async updateFee(memberId: string, fee: boolean): Promise<void> {
    const { role: _role } = await this.memberRepository.findById(memberId);

    if (_role === Role.WAITING) {
      throw new NotApprovedMemberException();
    }

    await this.memberRepository.updateFeeById(memberId, fee);
  }
}
