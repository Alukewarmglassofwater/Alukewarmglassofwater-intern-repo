import { Controller, Get, Post, Body, Headers, Injectable, NestMiddleware, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response, NextFunction } from 'express';
import { Observable, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

//Task 14 stuff


//see if this works?
@Injectable()
export class MySuperSecretInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
     return next.handle().pipe(
      map(data => ({
        message: 'injected response',
        original: data
        })
      )
    )
  }
}

@Injectable()
export class MiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {  //next must be there or the below controller class won't run
       console.log('Body:', req.body);    //request
       console.log('Headers:', req.headers); //request

      // let number = 2;

      // res.json({ message: "lmao injected buddyboi" });


   
next();

  }

}



@Controller('aTestController') //  first part of the URL
export class LogRequestandPayload {
  
  @Post('logtest') // second part
  logRequest(@Body() body: any, @Headers() headers: any) {
    console.log('Request Body:', body); // Log body
    console.log('Request Headers:', headers); // Log headers

    let number = 2;


    //fasdfasdfasdfadfasdf
    return { message: 'It actually worked how cool' }; // Send response
  }
}
