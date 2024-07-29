import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { Member } from '../../../member/member.schema';

import { AuthController } from '../../auth.controller';
import { AuthService } from '../../auth.service';
import { MemberRepository } from '../../../member/member.repository';
import { RedisRepository } from '../../../../utils/redis/RedisRepository';
import { NodeMail } from '../../../../utils/mail/NodeMail';

export const mockAuth = async () => {
  const memoryMemberRepository: Member[] = [];
  const memoryRedisRepository: Record<string, string> = {};

  const module = await Test.createTestingModule({
    controllers: [AuthController],
    providers: [
      AuthService,
      { provide: ConfigService, useValue: mockConfigService() },
      { provide: MemberRepository, useValue: mockMemberRepository(memoryMemberRepository) },
      { provide: RedisRepository, useValue: mockRedisRepository(memoryRedisRepository) },
      { provide: NodeMail, useValue: mockNodeMail() },
    ],
  }).compile();

  return {
    module,
    memoryMemberRepository,
    memoryRedisRepository,
  };
};

const mockConfigService = () => ({
  getOrThrow: jest.fn().mockImplementation((key: string) => {
    switch (key) {
      case 'jwt.secret':
        return 'jwt_secret_for_test';
      case 'jwt.expiresIn':
        return '1h';
      default:
        throw new Error(`Unknown key: ${key}`);
    }
  }),
});

const mockMemberRepository = (memory: Member[]) => ({
  save: jest.fn().mockImplementation(async (member: Partial<Member>) => {
    member['_id'] = memory.length.toString();
    memory.push(member as Member);
    return member as Member;
  }),

  findById: jest.fn().mockImplementation(async (id: string) => {
    return memory.find((member) => member['_id'] === id);
  }),

  findByEmailWithPassword: jest.fn().mockImplementation(async (email: string) => {
    return memory.find((member) => member.email === email);
  }),

  existsById: jest.fn().mockImplementation(async (id: string) => {
    return memory.some((member) => member['_id'] === id);
  }),

  existsByEmail: jest.fn().mockImplementation(async (email: string) => {
    return memory.some((member) => member.email === email);
  }),

  existsByStudentId: jest.fn().mockImplementation(async (studentId: number) => {
    return memory.some((member) => member.studentId === studentId);
  }),
});

const mockRedisRepository = (memory: Record<string, string>) => ({
  get: jest.fn().mockImplementation(async (key: string) => {
    return memory[key];
  }),

  set: jest.fn().mockImplementation(async (key: string, value: string) => {
    memory[key] = value;
  }),

  ttl: jest.fn().mockImplementation(async (key: string, value: string) => {
    memory[key] = value;
  }),

  delete: jest.fn().mockImplementation(async (key: string) => {
    return delete memory[key];
  }),

  exists: jest.fn().mockImplementation(async (key: string) => {
    return key in memory;
  }),
});

const mockNodeMail = () => ({
  sendMail: jest.fn(),
});
