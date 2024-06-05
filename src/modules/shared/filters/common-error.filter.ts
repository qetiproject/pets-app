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
    response
      .status(exception.status || HttpStatus.INTERNAL_SERVER_ERROR)
      .send(exception.response);
  }
}
