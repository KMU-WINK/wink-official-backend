import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Role } from './constant/Role';

export type MyInfoLinks = Record<'github' | 'instagram' | 'blog', string>;

const DEFAULT_LINKS: MyInfoLinks = {
  github: null,
  instagram: null,
  blog: null,
};

@Schema()
export class Member {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  studentId: number;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ default: null })
  avatar?: string;

  @Prop({ default: null })
  description?: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: Object, default: DEFAULT_LINKS })
  link: MyInfoLinks;

  @Prop({ type: String, enum: Role, default: Role.WAITING })
  role: Role;

  @Prop({ default: false })
  fee: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
