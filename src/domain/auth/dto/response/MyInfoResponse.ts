import { Role } from '../../../member/constant/Role';
import { MyInfoLinks } from '../../../member/member.schema';

export class MyInfoResponse {
  userId: string;
  name: string;
  studentId: number;
  avatar?: string;
  description?: string;
  link: MyInfoLinks;
  role: Role;
  fee: boolean;
}
