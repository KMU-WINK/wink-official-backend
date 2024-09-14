import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Activity } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Content {
  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: String, required: true })
  image!: string;
}

@Schema()
export class Social extends Activity {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: [Content], required: true })
  contents!: Content[];
}

export const SocialSchema: MongooseSchema<Social> = SchemaFactory.createForClass(Social);
