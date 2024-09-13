import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: String, required: true })
  name!: string;
}

export const CategorySchema: MongooseSchema<Category> = SchemaFactory.createForClass(Category);
