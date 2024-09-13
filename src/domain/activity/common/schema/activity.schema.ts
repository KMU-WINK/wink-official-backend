import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Member } from '@wink/member/schema';

import { ActivityType } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';

@Schema({ discriminatorKey: 'type' })
export class Activity {
  readonly _id!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  type!: ActivityType;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Member',
    autopopulate: true,
  })
  author!: Member;
}

export const ActivitySchema: MongooseSchema<Activity> = SchemaFactory.createForClass(Activity);
