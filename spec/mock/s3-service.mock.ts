export const mockS3Service = () => ({
  upload: jest.fn(
    async (file: Express.Multer.File) => `https://s3.amazonaws.com/${file.originalname}`,
  ),
  delete: jest.fn(),
  deleteFromUrl: jest.fn(),
});
