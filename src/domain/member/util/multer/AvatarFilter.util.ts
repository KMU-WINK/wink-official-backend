import { AvatarInvalidMimeException } from '../../exception';
import { AvatarTooLargeException } from '../../exception/avatar-too-large.exception';

const AVATAR_MIME_TYPES = ['image/jpeg', 'image/png'];
const AVATAR_MAX_SIZE = 1024 * 1024 * 2;

export const AvatarFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: any, success: any) => void,
) => {
  if (!AVATAR_MIME_TYPES.includes(file.mimetype)) {
    return callback(new AvatarInvalidMimeException(), false);
  }

  if (file.size > AVATAR_MAX_SIZE) {
    return callback(new AvatarTooLargeException(), false);
  }

  callback(null, true);
};
