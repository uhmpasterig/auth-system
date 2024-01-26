import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { UserNotFoundException } from '../exceptions';

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: UserNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(404).json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
