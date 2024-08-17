import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { ApiException } from '@wink/swagger';

import { Response } from 'express';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(ApiResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const response: Response = ctx.getResponse();

    response.status(HttpStatus.OK);

    return next.handle().pipe(
      map((content) => ({
        code: HttpStatus.OK,
        error: false,
        content: content ?? {},
      })),

      catchError((err) => {
        if (!(err instanceof ApiException)) {
          this.logger.error(err);
          return throwError(
            () =>
              new HttpException('서버에서 오류가 발생했습니다.', HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err,
              }),
          );
        }

        return throwError(() => err);
      }),
    );
  }
}
