import { AddTwoNumbersService, AppService, SubtractTwoNumbersService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
}
export declare class AddTwoNumbersController {
    private readonly AddTwoNumbersService;
    constructor(AddTwoNumbersService: AddTwoNumbersService);
    AddTwoNumbers(a: string, b: string): number;
}
export declare class SubtractTwoNumbersController {
    private readonly SubtractTwoNumbersService;
    constructor(SubtractTwoNumbersService: SubtractTwoNumbersService);
    SubtractTwoNumbers(a: string, b: string): number;
}
