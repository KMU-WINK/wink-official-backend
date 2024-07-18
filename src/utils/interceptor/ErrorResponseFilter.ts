import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(exception.getStatus()).json({ error: true, content: exception.message });
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionResponseFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(404).json({ error: true, content: 'Page not found' });
  }
}
