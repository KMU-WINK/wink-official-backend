import { v4 as uuid } from 'uuid';

import { Member } from '../../src/domain/member/schema';
import { Role } from '../../src/domain/member/constant';

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function bool(): boolean {
  return Math.random() >= 0.5;
}

export function generateMember(): Member {
  const name = randomString(10);
  const now = new Date();

  return {
    _id: uuid(),
    createdAt: randomDate(new Date(now.getFullYear(), 0, 1), now),
    updatedAt: randomDate(new Date(now.getFullYear(), 0, 1), now),
    name: name,
    studentId: 20240000 + Math.floor(Math.random() * 10000),
    email: `${name.toLowerCase()}@kookmin.ac.kr`,
    password: randomString(10),
    avatar: bool() ? `https://avatar.com/${name}.png` : null,
    description: bool() ? `Hi, I'm ${name}.` : null,
    link: {
      github: bool() ? `https://github.com/${name}` : null,
      instagram: bool() ? `https://instagram.com/${name}` : null,
      blog: bool() ? `https://${name}.tistory.com` : null,
    },
    role: Role.MEMBER,
    fee: bool(),
    approved: true,
  };
}

export function generateMembers(count: number): Member[] {
  const objects: Member[] = [];
  for (let i = 0; i < count; i++) {
    objects.push(generateMember());
  }
  return objects;
}
