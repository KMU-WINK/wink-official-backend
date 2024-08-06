import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Schema as MongooseSchema } from 'mongoose';

import { Role } from '../constant';

export interface MyInfoLinks {
  github: string | null;
  instagram: string | null;
  blog: string | null;
}

const DEFAULT_LINKS: MyInfoLinks = {
  github: null,
  instagram: null,
  blog: null,
};

@Schema()
export class Member {
  readonly _id!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  studentId!: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  email!: string;

  @Prop({ type: String, required: true, select: false })
  password!: string;

  @Prop({ type: String, required: false, default: null })
  avatar!: string | null;

  @Prop({ type: String, required: false, default: null })
  description!: string | null;

  @Prop({ type: Object, required: false, default: DEFAULT_LINKS })
  link!: MyInfoLinks;

  @Prop({ type: String, required: false, enum: Role, default: null })
  role!: Role | null;

  @Prop({ type: Boolean, required: false, default: false })
  fee!: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  approved!: boolean;
}

export const MemberSchema: MongooseSchema<Member> = SchemaFactory.createForClass(Member);
