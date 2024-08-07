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
    @Inject(`${S3Service}-avatar`) private readonly s3AvatarService: S3Service,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getMembers(): Promise<GetMembersResponseDto> {
    const execludeFields: (keyof Member)[] = ['email', 'studentId', 'fee', 'approved'];

    const members = (await this.memberRepository.findAll())
      .filter((member) => member.approved)
      .map((member) => {
        return <EachGetMembersResponseDto>omitMember(member, execludeFields);
      });

    return { members };
  }

  async updateMyInfo(
    member: Member,
    { description, github, instagram, blog }: UpdateMyInfoRequestDto,
  ): Promise<void> {
    const { _id: id } = member;

    await this.memberRepository.updateDescription(id, description);
    await this.memberRepository.updateGithub(id, github);
    await this.memberRepository.updateInstagram(id, instagram);
    await this.memberRepository.updateBlog(id, blog);

    this.eventEmitter.emit(
      UpdateMyInfoEvent.EVENT_NAME,
      new UpdateMyInfoEvent(member, description, github, instagram, blog),
    );
  }

  async updateMyPassword(
    member: Member,
    { password, newPassword }: UpdateMyPasswordRequestDto,
  ): Promise<void> {
    const { _id: id } = member;
    const fullMember = await this.memberRepository.findByIdWithPassword(id);

    if (!(await bcrypt.compare(password, fullMember!.password))) {
      throw new WrongPasswordException();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await this.memberRepository.updatePassword(id, hash);

    this.eventEmitter.emit(UpdateMyPasswordEvent.EVENT_NAME, new UpdateMyPasswordEvent(member));
  }

  async updateMyAvatar(
    member: Member,
    file: Express.Multer.File,
  ): Promise<UpdateMyAvatarResponseDto> {
    const { _id: id, avatar: original } = member;

    const avatar = await this.s3AvatarService.upload(file);
    await this.memberRepository.updateAvatar(id, avatar);

    if (original) {
      const key = this.s3AvatarService.extractKeyFromUrl(original);

      await this.s3AvatarService.delete(key);
    }

    this.eventEmitter.emit(UpdateMyAvatarEvent.EVENT_NAME, new UpdateMyAvatarEvent(member, avatar));

    return { avatar };
  }

  async deleteMyAvatar(member: Member): Promise<void> {
    const { _id: id, avatar } = member;

    if (avatar) {
      const key = this.s3AvatarService.extractKeyFromUrl(avatar);

      await this.s3AvatarService.delete(key);
      await this.memberRepository.updateAvatar(id, null);

      this.eventEmitter.emit(DeleteMyAvatarEvent.EVENT_NAME, new DeleteMyAvatarEvent(member));
    }
  }
}
