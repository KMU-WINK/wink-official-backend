import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Category {
  readonly _id!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  @Prop({ type: String, required: true })
  name!: string;
}

export const CategorySchema: MongooseSchema<Category> = SchemaFactory.createForClass(Category);
