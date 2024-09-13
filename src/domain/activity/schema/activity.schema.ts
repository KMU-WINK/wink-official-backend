import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Member } from '@wink/member/schema';

import { ActivityType } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';

@Schema({ discriminatorKey: 'type' })
export class Activity {
  type!: ActivityType;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Member' })
  author!: Member;
}

export const ActivitySchema: MongooseSchema<Activity> = SchemaFactory.createForClass(Activity);
