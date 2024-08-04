import { applyDecorators } from '@nestjs/common';

import { IsGithubFormat } from './format/IsGithubFormat.decorator';

import { NotEmpty } from './NotEmpty.decorator';

export const IsGithubUsername = () => {
  return applyDecorators(IsGithubFormat(), NotEmpty());
};
