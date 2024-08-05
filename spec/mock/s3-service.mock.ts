export const mockS3Service = () => ({
  upload: jest.fn(),
  delete: jest.fn(),
  deleteFromUrl: jest.fn(),
});
