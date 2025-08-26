import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class AddTwoNumbersService {
  add(a: number, b: number): number {
    return a + b;
  }
}

@Injectable()
export class Counter {
  private _value: number;

  constructor(initial = 0) {
    this._value = initial;
  }

  get value(): number {
    return this._value;
  }

  increment(step = 1): number {
    this._value += step;
    return this._value;
  }

  decrement(step = 1): number {
    this._value -= step;
    return this._value;
  }

  reset(): void {
    this._value = 0;
  }
}

@Injectable()
export class SubtractTwoNumbersService {
  sub(a: number, b: number): number {
    return a - b;
  }
}
