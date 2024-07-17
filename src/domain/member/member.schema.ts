import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { Role } from './constant/Role';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  studentId: number;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Role.MEMBER })
  role: Role;

  @Prop({ default: false })
  isVerified: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
