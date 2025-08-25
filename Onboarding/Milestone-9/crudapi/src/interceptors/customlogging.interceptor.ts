/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/common/interceptors/logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const start = Date.now();

    console.log(`➡️  ${method} ${url} — incoming request`);

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - start;
        console.log(
          `⬅️  ${method} ${url} — response after ${duration}ms:`,
          data,
        );
      }),
    );
  }
}
