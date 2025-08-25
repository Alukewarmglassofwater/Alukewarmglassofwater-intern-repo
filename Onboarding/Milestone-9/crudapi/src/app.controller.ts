import { Controller, Get, Query } from '@nestjs/common';
import { AddTwoNumbersService, AppService, Counter } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('math')
export class AddTwoNumbersController {
  constructor(private readonly AddTwoNumbersService: AddTwoNumbersService) {}

  @Get('add')
  AddTwoNumbers(@Query('a') a: string, @Query('b') b: string): number {
    return this.AddTwoNumbersService.add(Number(a), Number(b));
  }
}
