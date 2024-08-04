import { applyDecorators } from '@nestjs/common';

import { IsNameFormat } from './format/IsNameFormat.decorator';

import { MaxLength } from './MaxLength.decorator';
import { MinLength } from './MinLength.decorator';
import { NotEmpty } from './NotEmpty.decorator';

export const IsName = () => {
  return applyDecorators(IsNameFormat(), MaxLength(5), MinLength(2), NotEmpty());
};
