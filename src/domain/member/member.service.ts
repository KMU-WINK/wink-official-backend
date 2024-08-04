import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { EachGetMembersResponseDto } from './dto';

import { Member } from './member.schema';
import { MemberRepository } from './member.repository';

import { WrongPasswordException } from '../auth/exception';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async getMembers(): Promise<EachGetMembersResponseDto[]> {
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
        }) as EachGetMembersResponseDto,
    ) as EachGetMembersResponseDto[];
  }

  async updateMyInfo(
    member: Member,
    description?: string,
    github?: string,
    instagram?: string,
    blog?: string,
  ): Promise<void> {
    const id = member['_id'];

    await this.memberRepository.updateDescription(id, description);
    await this.memberRepository.updateGithub(id, github);
    await this.memberRepository.updateInstagram(id, instagram);
    await this.memberRepository.updateBlog(id, blog);
  }

  async updateMyPassword(member: Member, password: string, newPassword: string): Promise<void> {
    const id = member['_id'];

    const fullMember = await this.memberRepository.findByIdWithPassword(id);

    if (!(await bcrypt.compare(password, fullMember.password))) {
      throw new WrongPasswordException();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await this.memberRepository.updatePassword(id, hash);
  }

  async updateMyAvatar(member: Member, file: Express.MulterS3.File): Promise<string> {
    const id = member['_id'];
    const avatar = file.location;

    await this.memberRepository.updateAvatar(id, avatar);

    return avatar;
  }
}
