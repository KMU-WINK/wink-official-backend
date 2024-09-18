import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { WrongPasswordException } from '@wink/auth/exception';

import {
  EachGetMembersResponseDto,
  GetMembersResponseDto,
  UpdateMyAvatarResponseDto,
  UpdateMyInfoRequestDto,
  UpdateMyPasswordRequestDto,
} from '@wink/member/dto';
import { MemberRepository } from '@wink/member/repository';
import { Member, omitMember } from '@wink/member/schema';

import { S3Service } from '@wink/s3';

import {
  DeleteMyAvatarEvent,
  UpdateMyAvatarEvent,
  UpdateMyInfoEvent,
  UpdateMyPasswordEvent,
} from '@wink/event';

import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    @Inject('S3_SERVICE_AVATAR') private readonly avatarService: S3Service,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getMembers(): Promise<GetMembersResponseDto> {
    const execludeFields: (keyof Member)[] = ['email', 'studentId', 'fee', 'approved'];

    const members = (await this.memberRepository.findAll()).map((member) => {
      return <EachGetMembersResponseDto>omitMember(member, execludeFields);
    });

    return { members };
  }

  async updateMyInfo(
    member: Member,
    { description, github, instagram, blog }: UpdateMyInfoRequestDto,
  ): Promise<void> {
    console.log(description, github, instagram, blog);
    member.description = description;
    member.link = { github, instagram, blog };

    console.log(member);

    const t = await this.memberRepository.save(member);

    console.log(t);

    this.eventEmitter.emit(
      UpdateMyInfoEvent.EVENT_NAME,
      new UpdateMyInfoEvent(member, description, github, instagram, blog),
    );
  }

  async updateMyPassword(
    member: Member,
    { password, newPassword }: UpdateMyPasswordRequestDto,
  ): Promise<void> {
    const fullMember = (await this.memberRepository.findByIdWithPassword(member._id))!;

    if (!(await bcrypt.compare(password, fullMember.password))) {
      throw new WrongPasswordException();
    }

    const salt = await bcrypt.genSalt(10);
    fullMember.password = await bcrypt.hash(newPassword, salt);

    await this.memberRepository.save(fullMember);

    this.eventEmitter.emit(UpdateMyPasswordEvent.EVENT_NAME, new UpdateMyPasswordEvent(member));
  }

  async updateMyAvatar(
    member: Member,
    file: Express.Multer.File,
  ): Promise<UpdateMyAvatarResponseDto> {
    const { avatar: original } = member;

    const avatar = await this.avatarService.upload(file);

    member.avatar = avatar;
    await this.memberRepository.save(member);

    if (original) {
      const key = this.avatarService.extractKeyFromUrl(original);

      await this.avatarService.delete(key);
    }

    this.eventEmitter.emit(UpdateMyAvatarEvent.EVENT_NAME, new UpdateMyAvatarEvent(member, avatar));

    return { avatar };
  }

  async deleteMyAvatar(member: Member): Promise<void> {
    if (member.avatar) {
      const key = this.avatarService.extractKeyFromUrl(member.avatar);

      await this.avatarService.delete(key);

      member.avatar = null;
      await this.memberRepository.save(member);

      this.eventEmitter.emit(DeleteMyAvatarEvent.EVENT_NAME, new DeleteMyAvatarEvent(member));
    }
  }
}
