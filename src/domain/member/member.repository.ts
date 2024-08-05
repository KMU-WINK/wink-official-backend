import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Member } from './member.schema';
import { Role } from './constant/Role';

@Injectable()
export class MemberRepository {
  constructor(@InjectModel(Member.name) private readonly memberModel: Model<Member>) {}

  // Create
  async save(Member: Partial<Member>): Promise<Member> {
    return await this.memberModel.create(Member);
  }

  // Read
  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async findById(id: string): Promise<Member> {
    return await this.memberModel.findById(id).exec();
  }

  async findByIdWithPassword(id: string): Promise<Member> {
    return await this.memberModel.findOne({ _id: id }).select('+password').exec();
  }

  async findByEmailWithPassword(email: string): Promise<Member> {
    return await this.memberModel.findOne({ email }).select('+password').exec();
  }

  // Update
  async updatePassword(id: string, password: string): Promise<void> {
    await this.memberModel.updateOne({ _id: id }, { password }).exec();
  }

  async updateDescription(id: string, description: string): Promise<void> {
    await this.memberModel.updateOne({ _id: id }, { description }).exec();
  }

  async updateGithub(id: string, github: string): Promise<void> {
    await this.updateGithubUrl(id, github ? `https://github.com/${github}` : null);
  }

  async updateGithubUrl(id: string, githubUrl: string): Promise<void> {
    await this.memberModel.updateOne({ _id: id }, { 'link.github': githubUrl }).exec();
  }

  async updateInstagram(id: string, instagram: string): Promise<void> {
    await this.updateInstagramUrl(id, instagram ? `https://www.instagram.com/${instagram}` : null);
  }

  async updateInstagramUrl(id: string, instagramUrl: string): Promise<void> {
    await this.memberModel.updateOne({ _id: id }, { 'link.instagram': instagramUrl }).exec();
  }

  async updateBlog(id: string, blog: string): Promise<void> {
    await this.memberModel.updateOne({ _id: id }, { 'link.blog': blog }).exec();
  }

  async updateAvatar(id: string, avatar: string): Promise<void> {
    await this.memberModel.updateOne({ _id: id }, { avatar }).exec();
  }

  async updateRoleById(id: string, role: Role): Promise<void> {
    await this.memberModel.updateOne({ _id: id }, { role }).exec();
  }

  async updateFeeById(id: string, fee: boolean): Promise<void> {
    await this.memberModel.updateOne({ _id: id }, { fee }).exec();
  }

  async updateApprovedById(id: string, approved: boolean): Promise<void> {
    await this.memberModel.updateOne({ _id: id }, { approved }).exec();
  }

  // Delete
  async deleteById(id: string): Promise<void> {
    await this.memberModel.deleteOne({ _id: id }).exec();
  }

  // Exists
  async existsByEmail(email: string): Promise<boolean> {
    return !!(await this.memberModel.exists({ email }).exec());
  }

  async existsByStudentId(studentId: number): Promise<boolean> {
    return !!(await this.memberModel.exists({ studentId }).exec());
  }
}
