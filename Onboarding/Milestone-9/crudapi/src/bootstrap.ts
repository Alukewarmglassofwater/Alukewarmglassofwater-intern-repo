// so validationpipe runs when testing
import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setupApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.setGlobalPrefix('api'); // if you use a prefix
  return app;
}
