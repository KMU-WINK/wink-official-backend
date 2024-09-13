import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Activity } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Social extends Activity {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: [String], required: false, default: [] })
  images!: string[];

  @Prop({ type: String, required: true })
  content!: string;
}

export const SocialSchema: MongooseSchema<Social> = SchemaFactory.createForClass(Social);
