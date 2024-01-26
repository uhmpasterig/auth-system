import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const error =
      typeof response !== 'string' &&
      exceptionResponse['message'] instanceof Array
        ? exceptionResponse['message'].join(', ')
        : exceptionResponse['message'];

    if (!status || !request.url || !error) {
      throw new Error(
        'Required error information to throw the http-error is missing',
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
    });
  }
}
