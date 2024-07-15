import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('RequestLogging');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;

    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;

      const responseTime = Date.now() - start;

      this.logger.log(`${method} ${originalUrl} ${statusCode} ${responseTime}ms - ${ip}`);
    });

    next();
  }
}
