import { AvatarInvalidMimeException, AvatarTooLargeException } from '../../exception';

const AVATAR_MIME_TYPES = ['image/jpeg', 'image/png'];
const AVATAR_MAX_SIZE = 1024 * 1024 * 2;

export const AvatarFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, success: boolean) => void,
) => {
  if (!AVATAR_MIME_TYPES.includes(file.mimetype)) {
    return callback(new AvatarInvalidMimeException(), false);
  }

  if (file.size > AVATAR_MAX_SIZE) {
    return callback(new AvatarTooLargeException(), false);
  }

  callback(null, true);
};

export const AvatarFilterException = [
  {
    description: '프로필 사진의 MIME 타입이 잘못됨',
    error: AvatarInvalidMimeException,
  },
  {
    description: '프로필 사진의 파일 크기가 너무 큼',
    error: AvatarTooLargeException,
  },
];
