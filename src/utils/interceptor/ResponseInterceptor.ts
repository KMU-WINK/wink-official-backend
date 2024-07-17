import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger('ResponseInterceptor');

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((content) => ({
        error: false,
        content: content ?? {},
      })),

      catchError((err) => {
        if (!(err instanceof HttpException)) {
          this.logger.error(err);
          return throwError(() => new HttpException(err.message, 500, { cause: err }));
        }

        return throwError(() => err);
      }),
    );
  }
}
