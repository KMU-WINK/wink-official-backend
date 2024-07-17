import { Role } from '../../../member/constant/Role';

type LinkKey = 'github' | 'instagram' | 'blog';

export class MyInfoResponse {
  userId: string;
  name: string;
  studentId: number;
  avatar?: string;
  description?: string;
  link: Record<LinkKey, string>;
  role: Role;
  fee: boolean;
}
