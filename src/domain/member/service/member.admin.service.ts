import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

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

import { MemberNotFoundException, SuperRoleException } from '../../auth/exception';

import {
  ApproveAccountTemplate,
  MailService,
  RejectAccountTemplate,
} from '../../../common/utils/mail';
import {
  ApproveWaitingMemberEvent,
  RejectWaitingMemberEvent,
  UpdateFeeEvent,
  UpdateRoleEvent,
} from '../../../common/utils/event';

@Injectable()
export class MemberAdminService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly mailService: MailService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getWaitingMembers(): Promise<GetWaitingMembersResponseDto> {
    const members = (await this.memberRepository.findAll())
      .filter((member) => !member.approved)
      .map(({ name, studentId }) => <EachGetWaitingMembersResponseDto>{ name, studentId });

    return { members };
  }

  async approveWaitingMember(
    from: Member,
    { toId }: ApproveWaitingMemberRequestDto,
  ): Promise<void> {
    if (!(await this.memberRepository.existsById(toId))) {
      throw new MemberNotFoundException();
    }

    const to = <Member>await this.memberRepository.findById(toId);
    const { name, email, approved } = to;

    if (approved) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.updateApprovedById(toId, true);

    this.mailService.sendTemplate(email, new ApproveAccountTemplate(name)).then((_) => _);

    this.eventEmitter.emit(
      ApproveWaitingMemberEvent.EVENT_NAME,
      new ApproveWaitingMemberEvent(from, to),
    );
  }

  async rejectWaitingMember(from: Member, { toId }: RejectWaitingMemberRequestDto): Promise<void> {
    if (!(await this.memberRepository.existsById(toId))) {
      throw new MemberNotFoundException();
    }

    const to = <Member>await this.memberRepository.findById(toId);
    const { name, email, approved } = to;

    if (approved) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.deleteById(toId);

    this.mailService.sendTemplate(email, new RejectAccountTemplate(name)).then((_) => _);

    this.eventEmitter.emit(
      RejectWaitingMemberEvent.EVENT_NAME,
      new RejectWaitingMemberEvent(from, to),
    );
  }

  async getMembers(): Promise<GetMembersForAdminResponseDto> {
    const members = (await this.memberRepository.findAll())
      .filter((member) => member.approved)
      .map((member) => {
        return <EachGetMembersForAdminResponseDto>transferMember(member, ['approved']);
      });

    return { members };
  }

  async updateRole(from: Member, { toId, role }: UpdateMemberRoleRequestDto): Promise<void> {
    if (!(await this.memberRepository.existsById(toId))) {
      throw new MemberNotFoundException();
    }

    const to = <Member>await this.memberRepository.findById(toId);
    const { approved, role: targetRole } = to;

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    if (!canChangeRole(from.role!, targetRole!)) {
      throw new SuperRoleException();
    }

    await this.memberRepository.updateRoleById(toId, role);

    this.eventEmitter.emit(UpdateRoleEvent.EVENT_NAME, new UpdateRoleEvent(from, to, role));
  }

  async updateFee(from: Member, { toId, fee }: UpdateMemberFeeRequestDto): Promise<void> {
    if (!(await this.memberRepository.existsById(toId))) {
      throw new MemberNotFoundException();
    }

    const to = <Member>await this.memberRepository.findById(toId);
    const { approved, role: targetRole } = to;

    if (!approved) {
      throw new NotApprovedMemberException();
    }

    if (!canChangeRole(from.role!, targetRole!)) {
      throw new SuperRoleException();
    }

    await this.memberRepository.updateFeeById(toId, fee);

    this.eventEmitter.emit(UpdateFeeEvent.EVENT_NAME, new UpdateFeeEvent(from, to, fee));
  }
}
