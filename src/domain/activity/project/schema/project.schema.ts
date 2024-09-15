import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Member } from '@wink/member/schema';

import { Activity } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Project extends Activity {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'Member', autopopulate: true })
  author!: Member;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: [String], required: false, default: [] })
  tags!: string[];

  @Prop({ type: String, required: true })
  image!: string;
}

export const ProjectSchema: MongooseSchema<Project> = SchemaFactory.createForClass(Project);
