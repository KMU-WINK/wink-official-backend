import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { MemberNotFoundException, SuperRoleException } from '@wink/auth/exception';

import {
  ApproveWaitingMemberRequestDto,
  EachGetMembersForAdminResponseDto,
  EachGetWaitingMembersResponseDto,
  GetMembersForAdminResponseDto,
  GetWaitingMembersResponseDto,
  RejectWaitingMemberRequestDto,
  UpdateMemberFeeRequestDto,
  UpdateMemberRoleRequestDto,
} from '@wink/member/dto';
import { NotApprovedMemberException, NotWaitingMemberException } from '@wink/member/exception';
import { MemberRepository } from '@wink/member/repository';
import { Member, Role, checkRoleHierarchy, omitMember, pickMember } from '@wink/member/schema';

import {
  ApproveWaitingMemberEvent,
  RejectWaitingMemberEvent,
  UpdateFeeEvent,
  UpdateRoleEvent,
} from '@wink/event';
import { ApproveAccountTemplate, MailService, RejectAccountTemplate } from '@wink/mail';

@Injectable()
export class MemberAdminService {
  constructor(
    private readonly memberRepository: MemberRepository,

    private readonly eventEmitter: EventEmitter2,
    private readonly mailService: MailService,
  ) {}

  async getWaitingMembers(): Promise<GetWaitingMembersResponseDto> {
    const members = (await this.memberRepository.findAllWaitingMember()).map(
      (member) => <EachGetWaitingMembersResponseDto>pickMember(member, ['approved', 'role', 'fee']),
    );

    return { members };
  }

  async approveWaitingMember(
    from: Member,
    { memberId: toId }: ApproveWaitingMemberRequestDto,
  ): Promise<void> {
    const to = await this.memberRepository.findById(toId);

    if (!to) {
      throw new MemberNotFoundException();
    }

    if (to.approved) {
      throw new NotWaitingMemberException();
    }

    to.approved = true;
    to.role = Role.MEMBER;

    await this.memberRepository.save(to);

    this.mailService.sendTemplate(to.email, new ApproveAccountTemplate(to.name)).then((_) => _);

    this.eventEmitter.emit(
      ApproveWaitingMemberEvent.EVENT_NAME,
      new ApproveWaitingMemberEvent(from, to),
    );
  }

  async rejectWaitingMember(
    from: Member,
    { memberId: toId }: RejectWaitingMemberRequestDto,
  ): Promise<void> {
    const to = await this.memberRepository.findById(toId);

    if (!to) {
      throw new MemberNotFoundException();
    }

    if (to.approved) {
      throw new NotWaitingMemberException();
    }

    await this.memberRepository.deleteById(toId);

    this.mailService.sendTemplate(to.email, new RejectAccountTemplate(to.name)).then((_) => _);

    this.eventEmitter.emit(
      RejectWaitingMemberEvent.EVENT_NAME,
      new RejectWaitingMemberEvent(from, to),
    );
  }

  async getMembers(): Promise<GetMembersForAdminResponseDto> {
    const members = (await this.memberRepository.findAll()).map((member) => {
      return <EachGetMembersForAdminResponseDto>omitMember(member, ['approved']);
    });

    return { members };
  }

  async updateRole(
    from: Member,
    { memberId: toId, role }: UpdateMemberRoleRequestDto,
  ): Promise<void> {
    const to = await this.memberRepository.findById(toId);

    if (!to) {
      throw new MemberNotFoundException();
    }

    if (!to.approved) {
      throw new NotApprovedMemberException();
    }

    if (!checkRoleHierarchy(from.role!, to.role!)) {
      throw new SuperRoleException();
    }

    to.role = role;

    await this.memberRepository.save(to);

    this.eventEmitter.emit(UpdateRoleEvent.EVENT_NAME, new UpdateRoleEvent(from, to, role));
  }

  async updateFee(from: Member, { memberId: toId, fee }: UpdateMemberFeeRequestDto): Promise<void> {
    const to = await this.memberRepository.findById(toId);

    if (!to) {
      throw new MemberNotFoundException();
    }

    if (!to.approved) {
      throw new NotApprovedMemberException();
    }

    if (!checkRoleHierarchy(from.role!, to.role!)) {
      throw new SuperRoleException();
    }

    to.fee = fee;

    await this.memberRepository.save(to);

    this.eventEmitter.emit(UpdateFeeEvent.EVENT_NAME, new UpdateFeeEvent(from, to, fee));
  }
}
