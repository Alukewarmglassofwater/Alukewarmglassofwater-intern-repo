//middleware stuff
import {MiddleWare, MySuperSecretInterceptor} from './app.controller'; //from app.controller however recommended to put it in its own file 



import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LogRequestandPayload } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [LogRequestandPayload],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, //use interceptor everywhere
      useClass: MySuperSecretInterceptor, //declare my interceptor to use
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddleWare)
      .forRoutes(LogRequestandPayload)

  }

}


