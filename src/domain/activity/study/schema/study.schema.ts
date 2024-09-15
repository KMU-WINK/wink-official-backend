import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Activity, Category } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Study extends Activity {
  @Prop({ type: Date, required: true })
  uploadedAt!: Date;

  @Prop({ type: String, require: true })
  author!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: String, required: true })
  image!: string;

  @Prop({ type: String, required: true })
  link!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Category',
    autopopulate: true,
  })
  category!: Category;
}

export const StudySchema: MongooseSchema<Study> = SchemaFactory.createForClass(Study);
