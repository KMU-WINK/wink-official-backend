import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Member } from './member.schema';

import { Model, ObjectId } from 'mongoose';

@Injectable()
export class MemberRepository {
  constructor(@InjectModel(Member.name) private readonly memberModel: Model<Member>) {}

  // Create
  async save(Member: Partial<Member>): Promise<Member> {
    return await this.memberModel.create(Member);
  }

  // Read
  async findById(id: string | ObjectId): Promise<Member> {
    return await this.memberModel.findById(id).exec();
  }

  async findByEmailWithPassword(email: string): Promise<Member> {
    return await this.memberModel.findOne({ email }).select('+password').exec();
  }

  // Exists
  async existsByEmail(email: string): Promise<boolean> {
    return !!(await this.memberModel.exists({ email }).exec());
  }

  async existsByStudentId(studentId: number): Promise<boolean> {
    return !!(await this.memberModel.exists({ studentId }).exec());
  }
}
