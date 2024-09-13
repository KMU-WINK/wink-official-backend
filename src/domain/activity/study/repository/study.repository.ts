import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Study } from '@wink/activity/schema';

import { Model } from 'mongoose';

@Injectable()
export class StudyRepository {
  constructor(@InjectModel(Study.name) private readonly studyModel: Model<Study>) {}

  // Create
  async save(study: Partial<Study>): Promise<Study> {
    return this.studyModel.create(study);
  }

  // Read
  async findAll(): Promise<Study[]> {
    return this.studyModel.find().sort({ uploadedAt: -1 }).exec();
  }

  async findAllPage(page: number): Promise<Study[]> {
    return this.studyModel
      .find()
      .sort({ uploadedAt: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .exec();
  }

  async findById(id: string): Promise<Study | null> {
    return this.studyModel.findById(id).exec();
  }

  // Delete
  async deleteById(id: string): Promise<void> {
    await this.studyModel.deleteOne({ _id: id }).exec();
  }

  // Exists
  async existsById(id: string): Promise<boolean> {
    return !!(await this.studyModel.exists({ _id: id }).exec());
  }
}
