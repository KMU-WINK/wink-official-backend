import { Injectable, Logger } from '@nestjs/common';

import { MemberRepository } from '../repository';
import { Role } from '../constant';
import { EachGetMembersForAdminResponseDto, EachGetWaitingMembersResponseDto } from '../dto';
import { NotApprovedMemberException, NotWaitingMemberException } from '../exception';

import { MailService } from '../../../common/utils/mail';

@Injectable()
export class MemberAdminService {
  private readonly logger: Logger = new Logger(MemberAdminService.name);

  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly mailService: MailService,
  ) {}

  async getWaitingMembers(): Promise<EachGetWaitingMembersResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return members
      .filter((member) => !member.approved)
      .map(
        ({ name, studentId }) => ({ name, studentId }) as EachGetWaitingMembersResponseDto,
      ) as EachGetWaitingMembersResponseDto[];
  }

  async approveWaitingMember(memberId: string): Promise<void> {
    const { name, email, approved } = await this.memberRepository.findById(memberId);

    if (approved) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.updateApprovedById(memberId, true);

    this.logger.log(`Approve member: ${name} (${email})`);

    this.mailService.approveAccount({ name }).send(email);
  }

  async rejectWaitingMember(memberId: string): Promise<void> {
    const { name, email, approved } = await this.memberRepository.findById(memberId);

    if (approved) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.deleteById(memberId);

    this.logger.log(`Reject member: ${name} (${email})`);

    this.mailService.rejectAccount({ name }).send(email);
  }

  async getMembers(): Promise<EachGetMembersForAdminResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return members
      .filter((member) => member.approved)
      .map(
        ({ _id: memberId, name, studentId, email, avatar, description, link, role, fee }) =>
          ({
            memberId,
            name,
            studentId,
            email,
            avatar,
            description,
            link,
            role,
            fee,
          }) as EachGetMembersForAdminResponseDto,
      ) as EachGetMembersForAdminResponseDto[];
  }

  async updateRole(memberId: string, role: Role): Promise<void> {
    const { approved } = await this.memberRepository.findById(memberId);

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    this.logger.log(`Update role: ${memberId} to ${role}`);

    await this.memberRepository.updateRoleById(memberId, role);
  }

  async updateFee(memberId: string, fee: boolean): Promise<void> {
    const { approved } = await this.memberRepository.findById(memberId);

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    this.logger.log(`Update fee: ${memberId} to ${fee}`);

    await this.memberRepository.updateFeeById(memberId, fee);
  }
}
