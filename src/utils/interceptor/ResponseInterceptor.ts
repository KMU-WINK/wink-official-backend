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
        content,
      })),

      catchError((err) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;

        const errorResponse = {
          error: true,
          content: err.message || 'Internal server error',
        };

        if (!(err instanceof HttpException)) {
          this.logger.error(err);
        }

        return throwError(() => new HttpException(errorResponse, statusCode, { cause: err }));
      }),
    );
  }
}
