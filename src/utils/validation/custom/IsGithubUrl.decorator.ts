import { applyDecorators } from '@nestjs/common';

import { IsGithubUrlFormat } from './format/IsGithubUrlFormat.decorator';

import { NotEmpty } from './NotEmpty.decorator';

export const IsGithubUrl = () => {
  return applyDecorators(IsGithubUrlFormat(), NotEmpty());
};
