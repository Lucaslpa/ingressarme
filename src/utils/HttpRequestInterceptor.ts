import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Response } from '@application';
import { IValidateToken } from '@infra';

@Injectable()
export class HttpRequestInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly tokenIsValid: IValidateToken) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      mergeMap((data) => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        const token = request.headers['authorization'];

        if (!token) {
          throw new UnauthorizedException(
            new Response(false, null, ['Unauthorized']),
          );
        }

        return from(this.tokenIsValid.execute(token)).pipe(
          map((isValid) => {
            if (!isValid) {
              throw new UnauthorizedException(
                new Response(false, null, ['Unauthorized']),
              );
            }

            return data;
          }),
        );
      }),
    );
  }
}
