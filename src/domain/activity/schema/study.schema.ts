import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Activity } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Study extends Activity {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  link!: string;
}

export const StudySchema: MongooseSchema<Study> = SchemaFactory.createForClass(Study);
