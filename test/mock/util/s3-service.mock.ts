export const mockS3Service = () => ({
  upload: jest.fn(
    async (file: Express.Multer.File) => `https://s3.amazonaws.com/${file.originalname}`,
  ),
  delete: jest.fn(async () => {}),
  getKeys: jest.fn(async () => []),
  extractKeyFromUrl: jest.fn((url: string) => url),
});
