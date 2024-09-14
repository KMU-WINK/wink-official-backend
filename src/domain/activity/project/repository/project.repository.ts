import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Project } from '@wink/activity/schema';

import { Model } from 'mongoose';

@Injectable()
export class ProjectRepository {
  constructor(@InjectModel(Project.name) private readonly projectModel: Model<Project>) {}

  // Create
  async save(project: Partial<Project>): Promise<Project> {
    return this.projectModel.create(project);
  }

  // Read
  async findAll(): Promise<Project[]> {
    return this.projectModel.find().sort({ createdAt: -1 }).exec();
  }

  async findAllPage(page: number): Promise<Project[]> {
    return this.projectModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .exec();
  }

  async findById(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }

  // Update
  async updateTitleById(id: string, title: string): Promise<void> {
    await this.projectModel.updateOne({ _id: id }, { title }).exec();
  }

  async updateContentById(id: string, content: string): Promise<void> {
    await this.projectModel.updateOne({ _id: id }, { content }).exec();
  }

  async updateTagsById(id: string, tags: string[]): Promise<void> {
    await this.projectModel.updateOne({ _id: id }, { tags }).exec();
  }

  async updateImageById(id: string, image: string): Promise<void> {
    await this.projectModel.updateOne({ _id: id }, { image }).exec();
  }

  // Delete
  async deleteById(id: string): Promise<void> {
    await this.projectModel.deleteOne({ _id: id }).exec();
  }

  // Exists
  async existsById(id: string): Promise<boolean> {
    return !!(await this.projectModel.exists({ _id: id }).exec());
  }

  async existsByTitle(title: string): Promise<boolean> {
    return !!(await this.projectModel.exists({ title }).exec());
  }
}
