import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiException } from '@wink/swagger';

@Catch(ApiException)
export class DefaultExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.json({ code: exception.getStatus(), error: true, content: exception.message });
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.json({
      code: HttpStatus.NOT_FOUND,
      error: true,
      content: '엔드포인트를 찾을 수 없습니다.',
    });
  }
}
