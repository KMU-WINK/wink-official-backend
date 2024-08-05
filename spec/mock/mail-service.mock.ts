export const mockMailService = () => ({
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
  rejectAccount: jest.fn(() => ({
    send: jest.fn(async () => {}),
  })),
});
