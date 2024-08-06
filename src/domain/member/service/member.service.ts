import { Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { Member } from '../schema';
import { MemberRepository } from '../repository';
import { EachGetMembersResponseDto } from '../dto';

import { WrongPasswordException } from '../../auth/exception';

import { S3Service } from '../../../common/s3';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    @Inject(`${S3Service}-avatar`) private readonly s3AvatarService: S3Service,
  ) {}

  async getMembers(): Promise<EachGetMembersResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return <EachGetMembersResponseDto[]>members
      .filter((member) => member.approved)
      .map(({ _id: memberId, name, avatar, description, link, role }) => ({
        memberId,
        name,
        avatar,
        description,
        link,
        role,
      }));
  }

  async updateMyInfo(
    member: Member,
    description: string | null,
    github: string | null,
    instagram: string | null,
    blog: string | null,
  ): Promise<void> {
    const { _id: id } = member;

    await this.memberRepository.updateDescription(id, description);
    await this.memberRepository.updateGithub(id, github);
    await this.memberRepository.updateInstagram(id, instagram);
    await this.memberRepository.updateBlog(id, blog);
  }

  async updateMyPassword(member: Member, password: string, newPassword: string): Promise<void> {
    const { _id: id } = member;

    const fullMember = await this.memberRepository.findByIdWithPassword(id);

    if (!(await bcrypt.compare(password, fullMember!.password))) {
      throw new WrongPasswordException();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await this.memberRepository.updatePassword(id, hash);
  }

  async updateMyAvatar(member: Member, file: Express.Multer.File): Promise<string> {
    const { _id: id, avatar: original } = member;

    const avatar = await this.s3AvatarService.upload(file);
    await this.memberRepository.updateAvatar(id, avatar);

    if (original) {
      const key = this.s3AvatarService.extractKeyFromUrl(original);

      await this.s3AvatarService.delete(key);
    }

    return avatar;
  }

  async deleteMyAvatar(member: Member): Promise<void> {
    const { _id: id, avatar } = member;

    if (avatar) {
      const key = this.s3AvatarService.extractKeyFromUrl(avatar);

      await this.s3AvatarService.delete(key);
      await this.memberRepository.updateAvatar(id, null);
    }
  }
}
