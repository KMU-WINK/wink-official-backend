import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Content, Social } from '@wink/activity/schema';

import { Model } from 'mongoose';

@Injectable()
export class SocialRepository {
  constructor(@InjectModel(Social.name) private readonly socialModel: Model<Social>) {}

  // Create
  async save(social: Partial<Social>): Promise<Social> {
    return this.socialModel.create(social);
  }

  // Read
  async findAll(): Promise<Social[]> {
    return this.socialModel.find().sort({ createdAt: -1 }).limit(6).exec();
  }

  async findById(id: string): Promise<Social | null> {
    return this.socialModel.findById(id).exec();
  }

  // Update
  async updateTitleById(id: string, title: string): Promise<void> {
    await this.socialModel.updateOne({ _id: id }, { title }).exec();
  }

  async updateContentsById(id: string, contents: Content[]): Promise<void> {
    await this.socialModel.updateOne({ _id: id }, { contents }).exec();
  }

  // Delete
  async deleteById(id: string): Promise<void> {
    await this.socialModel.deleteOne({ _id: id }).exec();
  }

  // Exists
  async existsById(id: string): Promise<boolean> {
    return !!(await this.socialModel.exists({ _id: id }).exec());
  }

  async existsByTitle(title: string): Promise<boolean> {
    return !!(await this.socialModel.exists({ title }).exec());
  }
}
