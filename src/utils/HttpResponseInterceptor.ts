import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '@application';

@Injectable()
export class HttpResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        let isSuccess = false;
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let errors = ['Internal server error'];

        if (typeof data === 'object' && data !== null && 'isSuccess' in data) {
          isSuccess = data.isSuccess;
          errors = data.errors || null;
          statusCode = isSuccess ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        }

        response.status(statusCode);

        const responseBody: Response<T> = {
          isSuccess,
          data: isSuccess ? data.data || data : null,
          errors,
        };

        return responseBody;
      }),
    );
  }
}
