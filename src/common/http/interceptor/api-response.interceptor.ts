import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(ApiResponseInterceptor.name);

  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((content) => ({
        error: false,
        content: content ?? {},
      })),

      catchError((err) => {
        if (!(err instanceof HttpException)) {
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
