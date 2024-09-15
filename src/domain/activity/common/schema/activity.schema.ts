import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { ActivityType } from '@wink/activity/schema';

import { Schema as MongooseSchema } from 'mongoose';

@Schema({ discriminatorKey: 'type' })
export class Activity {
  readonly _id!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  type!: ActivityType;
}

export const ActivitySchema: MongooseSchema<Activity> = SchemaFactory.createForClass(Activity);
