import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { Member } from './member.schema';
import { MemberRepository } from './member.repository';
import { EachGetMembersResponseDto } from './dto';

import { WrongPasswordException } from '../auth/exception';

import { S3Service } from '../../utils';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly s3Service: S3Service,
  ) {}

  async getMembers(): Promise<EachGetMembersResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return members
      .filter((member) => member.approved)
      .map(
        (member) =>
          ({
            memberId: member['_id'],
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

  async updateMyAvatar(member: Member, file: Express.Multer.File): Promise<string> {
    const id = member['_id'];
    const original = member.avatar;

    const avatar = await this.s3Service.upload(file, 'avatars');
    await this.memberRepository.updateAvatar(id, avatar);

    if (original) {
      const key = this.s3Service.extractKey(original);

      await this.s3Service.delete(key);
    }

    return avatar;
  }
}
