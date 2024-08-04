import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

import * as bcrypt from 'bcrypt';

import { EachGetMembersResponseDto } from './dto';

import { Member } from './member.schema';
import { MemberRepository } from './member.repository';

import { Role } from './constant/Role';

import { WrongPasswordException } from '../auth/exception';
import { S3Provider } from '../../utils';

@Injectable()
export class MemberService {
  private readonly s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly memberRepository: MemberRepository,
    s3Provider: S3Provider,
  ) {
    this.s3Client = s3Provider.getS3Client();
  }

  async getMembers(): Promise<EachGetMembersResponseDto[]> {
    const members = await this.memberRepository.findAll();

    return members
      .filter((member) => member.role !== Role.WAITING)
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

  async updateMyAvatar(member: Member, file: Express.MulterS3.File): Promise<string> {
    const id = member['_id'];
    const original = member.avatar;

    const avatar = file.location;
    await this.memberRepository.updateAvatar(id, avatar);

    const bucket = this.configService.getOrThrow<string>('s3.bucket');
    const key = original.split('/').slice(-1)[0];
    await this.s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

    return avatar;
  }
}
