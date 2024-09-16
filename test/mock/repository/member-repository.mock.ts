import { Member } from '@wink/member/schema';

export const mockMemberRepository = (memory: Member[]) => ({
  // Create
  save: jest.fn(async (member: Partial<Member>) => {
    const index = memory.findIndex((m) => m._id === member._id);
    if (index !== -1) {
      memory[index] = { ...memory[index], ...member };
    } else {
      memory.push(member as Member);
    }
    return member as Member;
  }),

  // Read
  count: jest.fn(async () => {
    return memory.length;
  }),

  findAll: jest.fn(async () => {
    return memory.filter((member) => member.approved);
  }),

  findAllPage: jest.fn(async () => {
    return memory.filter((member) => member.approved);
  }),

  findAllWaitingMember: jest.fn(async () => {
    return memory.filter((member) => !member.approved);
  }),

  findById: jest.fn(async (id: string) => {
    return memory.find((member) => member._id === id);
  }),

  findByIdWithPassword: jest.fn(async (id: string) => {
    return memory.find((member) => member._id === id);
  }),

  findByEmailWithPassword: jest.fn(async (email: string) => {
    return memory.find((member) => member.email === email);
  }),

  // Delete
  deleteById: jest.fn(async (id: string) => {
    const index = memory.findIndex((member) => member._id === id);
    if (index !== -1) {
      memory.splice(index, 1);
    }
  }),

  // Exists
  existsById: jest.fn(async (id: string) => {
    return memory.some((member) => member._id === id);
  }),

  existsByEmail: jest.fn(async (email: string) => {
    return memory.some((member) => member.email === email);
  }),

  existsByStudentId: jest.fn(async (studentId: string) => {
    return memory.some((member) => member.studentId === studentId);
  }),
});
