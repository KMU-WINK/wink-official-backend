import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Category } from '@wink/activity/schema';

import { Model } from 'mongoose';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  // Create
  async save(study: Partial<Category>): Promise<Category> {
    return this.categoryModel.create(study);
  }

  // Read
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoryModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Category | null> {
    return this.categoryModel.findOne({ name }).exec();
  }

  // Update
  async updateNameById(id: string, name: string): Promise<void> {
    await this.categoryModel.updateOne({ _id: id }, { name }).exec();
  }

  // Delete
  async deleteById(id: string): Promise<void> {
    await this.categoryModel.deleteOne({ _id: id }).exec();
  }

  // Exists
  async existsById(id: string): Promise<boolean> {
    return !!(await this.categoryModel.exists({ _id: id }).exec());
  }

  async existsByName(name: string): Promise<boolean> {
    return !!(await this.categoryModel.exists({ name }).exec());
  }
}
