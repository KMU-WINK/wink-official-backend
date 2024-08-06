import { Injectable, Logger } from '@nestjs/common';

import { canChangeRole } from '../constant';
import { Member, transferMember } from '../schema';
import { MemberRepository } from '../repository';
import {
  ApproveWaitingMemberRequestDto,
  EachGetMembersForAdminResponseDto,
  EachGetWaitingMembersResponseDto,
  GetMembersForAdminResponseDto,
  GetWaitingMembersResponseDto,
  RejectWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
} from '../dto';
import { NotApprovedMemberException, NotWaitingMemberException } from '../exception';

import { MemberNotFoundException, PermissionException } from '../../auth/exception';

import {
  ApproveAccountTemplate,
  MailService,
  RejectAccountTemplate,
} from '../../../common/utils/mail';

@Injectable()
export class MemberAdminService {
  private readonly logger: Logger = new Logger(MemberAdminService.name);

  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly mailService: MailService,
  ) {}

  async getWaitingMembers(): Promise<GetWaitingMembersResponseDto> {
    const members = (await this.memberRepository.findAll())
      .filter((member) => !member.approved)
      .map(({ name, studentId }) => <EachGetWaitingMembersResponseDto>{ name, studentId });

    return { members };
  }

  async approveWaitingMember({ memberId }: ApproveWaitingMemberRequestDto): Promise<void> {
    if (!(await this.memberRepository.existsById(memberId))) {
      throw new MemberNotFoundException();
    }

    const { name, email, approved } = <Member>await this.memberRepository.findById(memberId);

    if (approved) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.updateApprovedById(memberId, true);

    this.logger.log(`Approve member: ${name} (${email})`);

    this.mailService.sendTemplate(email, new ApproveAccountTemplate(name)).then((_) => _);
  }

  async rejectWaitingMember({ memberId }: RejectWaitingMemberRequestDto): Promise<void> {
    if (!(await this.memberRepository.existsById(memberId))) {
      throw new MemberNotFoundException();
    }

    const { name, email, approved } = <Member>await this.memberRepository.findById(memberId);

    if (approved) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.deleteById(memberId);

    this.logger.log(`Reject member: ${name} (${email})`);

    this.mailService.sendTemplate(email, new RejectAccountTemplate(name)).then((_) => _);
  }

  async getMembers(): Promise<GetMembersForAdminResponseDto> {
    const members = (await this.memberRepository.findAll())
      .filter((member) => member.approved)
      .map((member) => {
        return <EachGetMembersForAdminResponseDto>transferMember(member, ['approved']);
      });

    return { members };
  }

  async updateRole(
    { _id, name, role: myRole }: Member,
    { memberId, role }: UpdateMemberRoleRequestDto,
  ): Promise<void> {
    if (!(await this.memberRepository.existsById(memberId))) {
      throw new MemberNotFoundException();
    }

    const { approved, role: targetRole } = <Member>await this.memberRepository.findById(memberId);

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    if (!canChangeRole(myRole!, targetRole!)) {
      throw new PermissionException();
    }

    this.logger.log(`Update role: ${memberId} to ${role} by ${name} (${_id})`);

    await this.memberRepository.updateRoleById(memberId, role);
  }

  async updateFee(
    { _id, name, role: myRole }: Member,
    { memberId, fee }: UpdateMemberFeeRequestDto,
  ): Promise<void> {
    if (!(await this.memberRepository.existsById(memberId))) {
      throw new MemberNotFoundException();
    }

    const { approved, role: targetRole } = <Member>await this.memberRepository.findById(memberId);

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    if (!canChangeRole(myRole!, targetRole!)) {
      throw new PermissionException();
    }

    this.logger.log(`Update fee: ${memberId} to ${fee} by ${name} (${_id})`);

    await this.memberRepository.updateFeeById(memberId, fee);
  }
}
