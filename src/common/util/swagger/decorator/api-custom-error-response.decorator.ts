import { applyDecorators, HttpException, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ApiCustomResponseDto } from '../dto';

interface ApiCustomExceptionOption {
  swagger: string;
  message: string;
  code: HttpStatus;
}

export class ApiException extends HttpException {
  private readonly description: string;

  constructor({ swagger, message, code }: ApiCustomExceptionOption) {
    super(message, code);

    this.description = swagger;
  }

  getDescription(): string {
    return this.description;
  }
}

export const ApiCustomErrorResponse = (errors: Type<ApiException>[]) => {
  const ERROR_MAP = new Map<number, [string, ApiException][]>();

  [...new Set(errors)]
    .map((error) => new error())
    .forEach((error) => {
      ERROR_MAP.has(error.getStatus());

      if (!ERROR_MAP.has(error.getStatus())) {
        ERROR_MAP.set(error.getStatus(), []);
      }

      ERROR_MAP.get(error.getStatus())!.push([error.getDescription(), error]);
    });

  return applyDecorators(
    ...Array.from(ERROR_MAP.entries()).map(([status, errors]) =>
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
                    content: error.getResponse(),
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
