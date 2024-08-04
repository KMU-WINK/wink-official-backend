import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '../../auth.controller';
import { AuthService } from '../../auth.service';

import { Member } from '../../../member/member.schema';
import { MemberRepository } from '../../../member/member.repository';
import { MailService, RedisRepository } from '../../../../utils';

export const mockAuth = async () => {
  const memoryMemberRepository: Member[] = [];
  const memoryRedisRepository: Record<string, string> = {};

  const module = await Test.createTestingModule({
    imports: [
      JwtModule.register({
        secret: 'jwt_secret_for_test',
        signOptions: { expiresIn: '1h' },
      }),
    ],
    controllers: [AuthController],
    providers: [
      AuthService,
      { provide: MemberRepository, useValue: mockMemberRepository(memoryMemberRepository) },
      { provide: RedisRepository, useValue: mockRedisRepository(memoryRedisRepository) },
      { provide: MailService, useValue: mockMailService() },
    ],
  }).compile();

  return {
    module,
    memoryMemberRepository,
    memoryRedisRepository,
  };
};

const mockMemberRepository = (memory: Member[]) => ({
  save: jest.fn(async (member: Partial<Member>) => {
    member['_id'] = memory.length.toString();
    memory.push(member as Member);
    return member as Member;
  }),

  findById: jest.fn(async (id: string) => {
    return memory.find((member) => member['_id'] === id);
  }),

  findByEmailWithPassword: jest.fn(async (email: string) => {
    return memory.find((member) => member.email === email);
  }),

  existsById: jest.fn(async (id: string) => {
    return memory.some((member) => member['_id'] === id);
  }),

  existsByEmail: jest.fn(async (email: string) => {
    return memory.some((member) => member.email === email);
  }),

  existsByStudentId: jest.fn(async (studentId: number) => {
    return memory.some((member) => member.studentId === studentId);
  }),
});

const mockRedisRepository = (memory: Record<string, string>) => ({
  get: jest.fn(async (key: string) => {
    return memory[key];
  }),

  set: jest.fn(async (key: string, value: string) => {
    memory[key] = value;
  }),

  ttl: jest.fn(async (key: string, value: string) => {
    memory[key] = value;
  }),

  delete: jest.fn(async (key: string) => {
    return delete memory[key];
  }),

  exists: jest.fn(async (key: string) => {
    return key in memory;
  }),
});

const mockMailService = () => ({
  send: jest.fn(async () => {}),
  verifyCode: jest.fn(() => ({
    send: jest.fn(async () => {}),
  })),
  registerComplete: jest.fn(() => ({
    send: jest.fn(async () => {}),
  })),
  approveAccount: jest.fn(() => ({
    send: jest.fn(async () => {}),
  })),
  refuseAccount: jest.fn(() => ({
    send: jest.fn(async () => {}),
  })),
});
