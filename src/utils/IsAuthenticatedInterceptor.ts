import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Response } from '@application';
import { ITokenIsValid } from '@infra';

@Injectable()
export class IsAuthenticatedInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly tokenIsValid: ITokenIsValid) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException(
        new Response(false, null, ['Unauthorized']),
      );
    }

    return from(this.tokenIsValid.execute(token)).pipe(
      mergeMap((isValid) => {
        if (!isValid) {
          throw new UnauthorizedException(
            new Response(false, null, ['Unauthorized']),
          );
        }

        return next.handle().pipe(
          map((data) => {
            return data;
          }),
        );
      }),
    );
  }
}
