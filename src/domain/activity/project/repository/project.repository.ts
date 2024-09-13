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
    return this.projectModel.find().exec();
  }

  async findById(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }

  // Delete
  async deleteById(id: string): Promise<void> {
    await this.projectModel.deleteOne({ _id: id }).exec();
  }

  // Exists
  async existsById(id: string): Promise<boolean> {
    return !!(await this.projectModel.exists({ _id: id }).exec());
  }
}
