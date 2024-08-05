export const mockMailService = () => ({
  send: jest.fn(async () => {}),
  verifyCode: jest.fn(() => ({
    send: jest.fn(async () => {}),
  })),
  registerComplete: jest.fn(() => ({
    send: jest.fn(async () => {}),
  })),
  approve: jest.fn(() => ({
    send: jest.fn(async () => {}),
  })),
  reject: jest.fn(() => ({
    send: jest.fn(async () => {}),
  })),
});
