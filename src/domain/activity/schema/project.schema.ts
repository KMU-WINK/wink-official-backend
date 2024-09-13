import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Activity } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Project extends Activity {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: [String], required: false, default: [] })
  tags!: string[];

  @Prop({ type: [String], required: false, default: [] })
  images!: string[];

  @Prop({ type: String, required: true })
  content!: string;
}

export const ProjectSchema: MongooseSchema<Project> = SchemaFactory.createForClass(Project);
