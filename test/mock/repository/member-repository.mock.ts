import { Member, Role } from '@wink/member/schema';

// noinspection t
export const mockMemberRepository = (memory: Member[]) => ({
  // Create
  save: jest.fn(async (member: Partial<Member>) => {
    Object.assign(member, {
      _id: member['_id'],
      ...member,
    });
    memory.push(member as Member);
    return member as Member;
  }),

  // Read
  findAll: jest.fn(async () => {
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

  // Update
  updatePassword: jest.fn(async (id: string, password: string) => {
    const member = memory.find((member) => member._id === id);
    if (member) {
      member.password = password;
    }
  }),

  updateDescription: jest.fn(async (id: string, description: string) => {
    const member = memory.find((member) => member._id === id);
    if (member) {
      member.description = description;
    }
  }),

  updateGithub: jest.fn(async (id: string, githubUrl: string) => {
    const member = memory.find((member) => member._id === id);
    if (member) {
      member.link.github = githubUrl;
    }
  }),

  updateInstagram: jest.fn(async (id: string, instagramUrl: string) => {
    const member = memory.find((member) => member._id === id);
    if (member) {
      member.link.instagram = instagramUrl;
    }
  }),

  updateBlog: jest.fn(async (id: string, blog: string) => {
    const member = memory.find((member) => member._id === id);
    if (member) {
      member.link.blog = blog;
    }
  }),

  updateAvatar: jest.fn(async (id: string, avatar: string) => {
    const member = memory.find((member) => member._id === id);
    if (member) {
      member.avatar = avatar;
    }
  }),

  updateRoleById: jest.fn(async (id: string, role: Role) => {
    const member = memory.find((member) => member._id === id);
    if (member) {
      member.role = role;
    }
  }),

  updateFeeById: jest.fn(async (id: string, fee: boolean) => {
    const member = memory.find((member) => member._id === id);
    if (member) {
      member.fee = fee;
    }
  }),

  updateApprovedById: jest.fn(async (id: string, approved: boolean) => {
    const member = memory.find((member) => member._id === id);
    if (member) {
      member.approved = approved;
    }
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
