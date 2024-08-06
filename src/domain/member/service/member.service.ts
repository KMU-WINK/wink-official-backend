import { Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { Member, transferMember } from '../schema';
import { MemberRepository } from '../repository';
import {
  EachGetMembersResponseDto,
  GetMembersResponseDto,
  UpdateMyAvatarResponseDto,
  UpdateMyInfoRequestDto,
  UpdateMyPasswordRequestDto,
} from '../dto';

import { WrongPasswordException } from '../../auth/exception';

import { S3Service } from '../../../common/s3';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    @Inject(`${S3Service}-avatar`) private readonly s3AvatarService: S3Service,
  ) {}

  async getMembers(): Promise<GetMembersResponseDto> {
    const execludeFields: (keyof Member)[] = ['email', 'studentId', 'fee', 'approved'];

    const members = (await this.memberRepository.findAll())
      .filter((member) => member.approved)
      .map((member) => {
        return <EachGetMembersResponseDto>transferMember(member, execludeFields);
      });

    return { members };
  }

  async updateMyInfo(
    { _id: id }: Member,
    { description, github, instagram, blog }: UpdateMyInfoRequestDto,
  ): Promise<void> {
    await this.memberRepository.updateDescription(id, description);
    await this.memberRepository.updateGithub(id, github);
    await this.memberRepository.updateInstagram(id, instagram);
    await this.memberRepository.updateBlog(id, blog);
  }

  async updateMyPassword(
    { _id: id }: Member,
    { password, newPassword }: UpdateMyPasswordRequestDto,
  ): Promise<void> {
    const fullMember = await this.memberRepository.findByIdWithPassword(id);

    if (!(await bcrypt.compare(password, fullMember!.password))) {
      throw new WrongPasswordException();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await this.memberRepository.updatePassword(id, hash);
  }

  async updateMyAvatar(
    { _id: id, avatar: original }: Member,
    file: Express.Multer.File,
  ): Promise<UpdateMyAvatarResponseDto> {
    const avatar = await this.s3AvatarService.upload(file);
    await this.memberRepository.updateAvatar(id, avatar);

    if (original) {
      const key = this.s3AvatarService.extractKeyFromUrl(original);

      await this.s3AvatarService.delete(key);
    }

    return { avatar };
  }

  async deleteMyAvatar({ _id: id, avatar }: Member): Promise<void> {
    if (avatar) {
      const key = this.s3AvatarService.extractKeyFromUrl(avatar);

      await this.s3AvatarService.delete(key);
      await this.memberRepository.updateAvatar(id, null);
    }
  }
}
