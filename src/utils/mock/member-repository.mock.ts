import { Member } from '../../domain/member/member.schema';
import { Role } from '../../domain/member/constant/Role';

// noinspection t
export const mockMemberRepository = (memory: Member[]) => ({
  // Create
  save: jest.fn(async (member: Partial<Member>) => {
    member['_id'] = memory.length.toString();
    memory.push(member as Member);
    return member as Member;
  }),

  // Read
  findAll: jest.fn(async () => {
    return memory;
  }),

  findById: jest.fn(async (id: string) => {
    return memory.find((member) => member['_id'] === id);
  }),

  findByIdWithPassword: jest.fn(async (id: string) => {
    return memory.find((member) => member['_id'] === id);
  }),

  findByEmailWithPassword: jest.fn(async (email: string) => {
    return memory.find((member) => member.email === email);
  }),

  // Update
  updatePassword: jest.fn(async (id: string, password: string) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.password = password;
    }
  }),

  updateDescription: jest.fn(async (id: string, description: string) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.description = description;
    }
  }),

  updateGithub: jest.fn(async (id: string, github: string) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.link.github = github ? `https://github.com/${github}` : null;
    }
  }),

  updateGithubUrl: jest.fn(async (id: string, githubUrl: string) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.link.github = githubUrl;
    }
  }),

  updateInstagram: jest.fn(async (id: string, instagram: string) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.link.instagram = instagram ? `https://www.instagram.com/${instagram}` : null;
    }
  }),

  updateInstagramUrl: jest.fn(async (id: string, instagramUrl: string) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.link.instagram = instagramUrl;
    }
  }),

  updateBlog: jest.fn(async (id: string, blog: string) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.link.blog = blog;
    }
  }),

  updateAvatar: jest.fn(async (id: string, avatar: string) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.avatar = avatar;
    }
  }),

  updateRoleById: jest.fn(async (id: string, role: Role) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.role = role;
    }
  }),

  updateFeeById: jest.fn(async (id: string, fee: boolean) => {
    const member = memory.find((member) => member['_id'] === id);
    if (member) {
      member.fee = fee;
    }
  }),

  // Delete
  deleteById: jest.fn(async (id: string) => {
    const index = memory.findIndex((member) => member['_id'] === id);
    if (index !== -1) {
      memory.splice(index, 1);
    }
  }),

  // Exists
  existsByEmail: jest.fn(async (email: string) => {
    return memory.some((member) => member.email === email);
  }),

  existsByStudentId: jest.fn(async (studentId: number) => {
    return memory.some((member) => member.studentId === studentId);
  }),
});