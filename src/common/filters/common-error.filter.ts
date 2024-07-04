import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class CommonErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(exception.status || HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: exception.response || 'INTERNAL_SERVER_ERROR',
      status: exception.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
