import {
  ImageInvalidMimeException,
  ImageTooLargeException,
} from '@wink/activity/common/exceptions';

const IMAGE_MAX_SIZE = 1024 * 1024 * 10;

export const ImageFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, success: boolean) => void,
) => {
  if (!file.mimetype.startsWith('image/')) {
    return callback(new ImageInvalidMimeException(), false);
  }

  if (file.size > IMAGE_MAX_SIZE) {
    return callback(new ImageTooLargeException(), false);
  }

  callback(null, true);
};

export const ImageFilterException = [ImageInvalidMimeException, ImageTooLargeException];
