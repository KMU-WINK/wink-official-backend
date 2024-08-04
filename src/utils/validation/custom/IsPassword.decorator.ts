import { applyDecorators } from '@nestjs/common';

import { IsPasswordFormat } from './format/IsPasswordFormat.decorator';

import { MaxLength } from './MaxLength.decorator';
import { MinLength } from './MinLength.decorator';
import { NotEmpty } from './NotEmpty.decorator';

export const IsPassword = () => {
  return applyDecorators(IsPasswordFormat(), MinLength(8), MaxLength(24), NotEmpty());
};
