export const mockRedisRepository = (memory: Record<string, string>) => ({
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