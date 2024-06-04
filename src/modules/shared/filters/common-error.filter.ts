import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class CommonErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).send();
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
    // response
    //   .status(exception.status || HttpStatus.INTERNAL_SERVER_ERROR)
    //   .send();
  }
}
