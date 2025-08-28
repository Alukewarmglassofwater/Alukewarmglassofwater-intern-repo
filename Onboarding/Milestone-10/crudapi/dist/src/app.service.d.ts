export declare class AppService {
    getHello(): string;
}
export declare class AddTwoNumbersService {
    add(a: number, b: number): number;
}
export declare class Counter {
    private _value;
    constructor(initial?: number);
    get value(): number;
    increment(step?: number): number;
    decrement(step?: number): number;
    reset(): void;
}
export declare class SubtractTwoNumbersService {
    sub(a: number, b: number): number;
}
