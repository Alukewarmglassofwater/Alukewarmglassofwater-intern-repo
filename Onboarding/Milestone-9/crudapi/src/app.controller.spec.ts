/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController, AddTwoNumbersController } from './app.controller';
import { AppService, AddTwoNumbersService, Counter } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  const appServiceMock = {
    getHello: jest.fn().mockReturnValue('Hello World!'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appServiceMock }],
    }).compile();

    controller = module.get<AppController>(AppController); // <-- this was missing
  });

  it('delegates to AppService.getHello', () => {
    expect(controller.getHello()).toBe('Hello World!');
    expect(appServiceMock.getHello).toHaveBeenCalledTimes(1);
  });
});

describe('AppService (real)', () => {
  it('getHello returns greeting', () => {
    expect(new AppService().getHello()).toBe('Hello World!');
  });
});

describe('Counter', () => {
  it('constructor sets initial and getter returns it', () => {
    const c = new Counter(5);
    expect(c.value).toBe(5);
  });

  it('increment and decrement work', () => {
    const c = new Counter(1);
    expect(c.increment()).toBe(2);
    expect(c.increment(3)).toBe(5);
    expect(c.decrement(2)).toBe(3);
  });

  it('reset sets value to 0', () => {
    const c = new Counter(10);
    c.reset();
    expect(c.value).toBe(0);
  });
});

describe('AddTwoNumbersController', () => {
  let controller: AddTwoNumbersController;
  const addMock = jest.fn<number, [number, number]>().mockReturnValue(0);
  const mathServiceMock: jest.Mocked<AddTwoNumbersService> = {
    add: addMock,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddTwoNumbersController],
      providers: [{ provide: AddTwoNumbersService, useValue: mathServiceMock }],
    }).compile();

    controller = module.get(AddTwoNumbersController);
    addMock.mockClear();
  });

  it('parses ints and delegates to service', () => {
    addMock.mockReturnValueOnce(5);
    expect(controller.AddTwoNumbers('2', '3')).toBe(5);
    expect(addMock).toHaveBeenCalledWith(2, 3);
  });

  it('handles negatives', () => {
    addMock.mockReturnValueOnce(-1);
    expect(controller.AddTwoNumbers('-3', '2')).toBe(-1);
    expect(addMock).toHaveBeenCalledWith(-3, 2);
  });

  it('handles decimals', () => {
    addMock.mockReturnValueOnce(3);
    expect(controller.AddTwoNumbers('2.5', '0.5')).toBe(3);
    expect(addMock).toHaveBeenCalledWith(2.5, 0.5);
  });

  it('trims whitespace around numbers', () => {
    addMock.mockReturnValueOnce(15);
    expect(controller.AddTwoNumbers(' 7 ', ' 8 ')).toBe(15);
    expect(addMock).toHaveBeenCalledWith(7, 8);
  });

  it('non-numeric -> NaN (first arg)', () => {
    addMock.mockReturnValueOnce(NaN as any);
    controller.AddTwoNumbers('abc', '2');
    const [a, b] = addMock.mock.calls[0];
    expect(Number.isNaN(a)).toBe(true);
    expect(b).toBe(2);
  });

  it('missing second query -> NaN (second arg)', () => {
    addMock.mockReturnValueOnce(NaN as any);
    controller.AddTwoNumbers('2', undefined as any);
    const [, b] = addMock.mock.calls[0];
    expect(Number.isNaN(b)).toBe(true);
  });
});
