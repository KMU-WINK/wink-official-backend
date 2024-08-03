import { applyDecorators, HttpException, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ApiCustomResponseDto } from '../dto';

interface ApiCustomErrorResponseOptions {
  description: string;
  error: Type<HttpException>;
}

export const ApiCustomErrorResponse = (options: ApiCustomErrorResponseOptions[]) => {
  const errors = new Map<number, [string, HttpException][]>();

  options.forEach((option) => {
    const error = new option.error();
    errors.has(error.getStatus());

    if (!errors.has(error.getStatus())) {
      errors.set(error.getStatus(), []);
    }

    errors.get(error.getStatus()).push([option.description, error]);
  });

  return applyDecorators(
    ...Array.from(errors.entries()).map(([status, errors]) =>
      ApiResponse({
        status,
        content: {
          'application/json': {
            schema: {
              $ref: getSchemaPath(ApiCustomResponseDto),
            },
            examples: Object.fromEntries(
              errors.map(([description, error], index) => [
                `error${index}`,
                {
                  value: {
                    error: true,
                    data: error.getResponse(),
                  },
                  summary: description,
                },
              ]),
            ),
          },
        },
      }),
    ),
  );
};
