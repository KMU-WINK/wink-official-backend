import { Injectable, Logger } from '@nestjs/common';

import { MemberRepository } from '../repository';
import { Role } from '../constant';
import { EachGetMembersForAdminResponseDto, EachGetWaitingMembersResponseDto } from '../dto';
import { NotApprovedMemberException, NotWaitingMemberException } from '../exception';

import { MailService } from '../../../common/utils/mail';
import { Member } from '../schema';
import { MemberNotFoundException } from '../../auth/exception';

@Injectable()
export class MemberAdminService {
  private readonly logger: Logger = new Logger(MemberAdminService.name);

  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly mailService: MailService,
  ) {}

  async getWaitingMembers(): Promise<EachGetWaitingMembersResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return <EachGetWaitingMembersResponseDto[]>(
      members
        .filter((member) => !member.approved)
        .map(({ name, studentId }) => <EachGetWaitingMembersResponseDto>{ name, studentId })
    );
  }

  async approveWaitingMember(memberId: string): Promise<void> {
    if (!(await this.memberRepository.existsById(memberId))) {
      throw new MemberNotFoundException();
    }

    const { name, email, approved } = <Member>await this.memberRepository.findById(memberId);

    if (approved) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.updateApprovedById(memberId, true);

    this.logger.log(`Approve member: ${name} (${email})`);

    this.mailService.approveAccount({ name }).send(email);
  }

  async rejectWaitingMember(memberId: string): Promise<void> {
    if (!(await this.memberRepository.existsById(memberId))) {
      throw new MemberNotFoundException();
    }

    const { name, email, approved } = <Member>await this.memberRepository.findById(memberId);

    if (approved) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.deleteById(memberId);

    this.logger.log(`Reject member: ${name} (${email})`);

    this.mailService.rejectAccount({ name }).send(email);
  }

  async getMembers(): Promise<EachGetMembersForAdminResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return <EachGetMembersForAdminResponseDto[]>members
      .filter((member) => member.approved)
      .map(({ _id: memberId, name, studentId, email, avatar, description, link, role, fee }) => ({
        memberId,
        name,
        studentId,
        email,
        avatar,
        description,
        link,
        role,
        fee,
      }));
  }

  async updateRole(memberId: string, role: Role): Promise<void> {
    if (!(await this.memberRepository.existsById(memberId))) {
      throw new MemberNotFoundException();
    }

    const { approved } = <Member>await this.memberRepository.findById(memberId);

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    this.logger.log(`Update role: ${memberId} to ${role}`);

    await this.memberRepository.updateRoleById(memberId, role);
  }

  async updateFee(memberId: string, fee: boolean): Promise<void> {
    if (!(await this.memberRepository.existsById(memberId))) {
      throw new MemberNotFoundException();
    }

    const { approved } = <Member>await this.memberRepository.findById(memberId);

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    this.logger.log(`Update fee: ${memberId} to ${fee}`);

    await this.memberRepository.updateFeeById(memberId, fee);
  }
}
