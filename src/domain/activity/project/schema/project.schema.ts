import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Activity } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';
import { Member } from '@wink/member/schema';

@Schema()
export class Project extends Activity {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: [String], required: false, default: [] })
  tags!: string[];

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: String, required: true })
  image!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, require: true, ref: 'Member', autopopulate: true })
  author!: Member;
}

export const ProjectSchema: MongooseSchema<Project> = SchemaFactory.createForClass(Project);
