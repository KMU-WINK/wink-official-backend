import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Member, Role } from '@wink/member/schema';

import { Model } from 'mongoose';

const roleOrder = Object.values(Role);

@Injectable()
export class MemberRepository {
  constructor(@InjectModel(Member.name) private readonly memberModel: Model<Member>) {}

  // Create
  async save(member: Partial<Member>): Promise<Member> {
    return this.memberModel.create(member);
  }

  // Read
  async count(): Promise<number> {
    return this.memberModel.countDocuments().exec();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.aggregate([
      {
        $match: {
          approved: true,
        },
      },
      {
        $addFields: {
          roleIndex: {
            $switch: {
              branches: roleOrder.map((role, index) => ({
                case: { $eq: ['$role', role] },
                then: index,
              })),
              default: roleOrder.length,
            },
          },
        },
      },
      {
        $sort: {
          roleIndex: 1,
          name: 1,
        },
      },
    ]);
  }

  async findAllPage(page: number): Promise<Member[]> {
    return this.memberModel.aggregate([
      {
        $match: {
          approved: true,
        },
      },
      {
        $addFields: {
          roleIndex: {
            $switch: {
              branches: roleOrder.map((role, index) => ({
                case: { $eq: ['$role', role] },
                then: index,
              })),
              default: roleOrder.length,
            },
          },
        },
      },
      {
        $sort: {
          roleIndex: 1,
          name: 1,
        },
      },
      {
        $skip: 10 * (page - 1),
      },
      {
        $limit: 10,
      },
    ]);
  }

  async findByContainsName(name: string): Promise<Member[]> {
    return this.memberModel.aggregate([
      {
        $match: {
          approved: true,
          name: { $regex: name, $options: 'i' },
        },
      },
      {
        $addFields: {
          roleIndex: {
            $switch: {
              branches: roleOrder.map((role, index) => ({
                case: { $eq: ['$role', role] },
                then: index,
              })),
              default: roleOrder.length,
            },
          },
        },
      },
      {
        $sort: {
          roleIndex: 1,
          name: 1,
        },
      },
    ]);
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
