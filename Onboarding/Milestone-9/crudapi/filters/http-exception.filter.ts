/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* filters/http-exception.filter.ts */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PinoLogger } from 'nestjs-pino'; // or Nest Logger if you prefer

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(HttpExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as any;
      message = Array.isArray(res?.message)
        ? res.message.join(', ')
        : (res?.message ?? exception.message);
    } else if (typeof (exception as any)?.statusCode === 'number') {
      // e.g., @fastify/rate-limit and other Fastify plugins
      status = (exception as any).statusCode;
      message = (exception as any).message ?? message;
    }

    this.logger.error(
      { err: exception, status, url: request.url, method: request.method },
      'Unhandled exception',
    );

    // Fastify-style response
    reply.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
