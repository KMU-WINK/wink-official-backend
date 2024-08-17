export const mockConfigService = () => ({
  getOrThrow: jest.fn((key: string) => {
    switch (key) {
      case 'jwt.expiresIn.access':
        return '1d';
      case 'jwt.expiresIn.refresh':
        return '7d';
    }

    return null;
  }),
});
