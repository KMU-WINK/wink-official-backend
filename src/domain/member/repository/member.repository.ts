import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Member } from '@wink/member/schema';

import { Model } from 'mongoose';

@Injectable()
export class MemberRepository {
  constructor(@InjectModel(Member.name) private readonly memberModel: Model<Member>) {}

  // Create
  async save(member: Partial<Member>): Promise<Member> {
    return this.memberModel.create(member);
  }

  // Read
  async findAll(): Promise<Member[]> {
    return this.memberModel.find({ approved: true }).exec();
  }

  async findAllWaitingMember(): Promise<Member[]> {
    return this.memberModel.find({ approved: false }).exec();
  }

  async findById(id: string): Promise<Member | null> {
    return this.memberModel.findById(id).exec();
  }

  async findByIdWithPassword(id: string): Promise<Member | null> {
    return this.memberModel.findOne({ _id: id }).select('+password').exec();
  }

  async findByEmailWithPassword(email: string): Promise<Member | null> {
    return this.memberModel.findOne({ email }).select('+password').exec();
  }

  // Delete
  async deleteById(id: string): Promise<void> {
    await this.memberModel.deleteOne({ _id: id }).exec();
  }

  // Exists
  async existsByEmail(email: string): Promise<boolean> {
    return !!(await this.memberModel.exists({ email }).exec());
  }

  async existsByStudentId(studentId: string): Promise<boolean> {
    return !!(await this.memberModel.exists({ studentId }).exec());
  }
}
