import { Injectable } from '@nestjs/common';

import { MemberRepository } from '../member.repository';

import { EachGetMembersForAdminResponseDto, EachGetWaitingMembersResponseDto } from '../dto';

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
    await this.memberRepository.updateRoleById(memberId, Role.MEMBER);

    const { name, email } = await this.memberRepository.findById(memberId);
    await this.mailService.approveAccount({ name }).send(email);
  }

  async refuseWaitingMember(memberId: string): Promise<void> {
    await this.memberRepository.deleteById(memberId);

    const { name, email } = await this.memberRepository.findById(memberId);
    await this.mailService.refuseAccount({ name }).send(email);
  }

  async getMembers(): Promise<EachGetMembersForAdminResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return members.map(
      (member) =>
        ({
          userId: member['_id'],
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

  async updateRole(userId: string, role: Role): Promise<void> {
    await this.memberRepository.updateRoleById(userId, role);
  }

  async updateFee(userId: string, fee: boolean): Promise<void> {
    await this.memberRepository.updateFeeById(userId, fee);
  }
}
