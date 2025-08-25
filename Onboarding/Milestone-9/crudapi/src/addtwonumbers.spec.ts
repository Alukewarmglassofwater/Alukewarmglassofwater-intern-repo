// describe('AddTwoNumbersService', () => {
//   let service: AddTwoNumbersService;

//   beforeEach(() => {
//     //sets up a new instance of service for every test
//     service = new AddTwoNumbersService();
//   });

//   it('sum of two numbers', () => {
//     expect(service.add(5, 5)).toBe(10);
//   });

//   it('handle neg numbers', () => {
//     expect(service.add(-1, 2)).toBe(1);
//   });
// });

// src/app.service.spec.ts (or wherever your service lives)
import { Test, TestingModule } from '@nestjs/testing';
import { AddTwoNumbersService } from './app.service';

describe('AddTwoNumbersService (TestingModule)', () => {
  let module: TestingModule;
  let service: AddTwoNumbersService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [AddTwoNumbersService],
    }).compile();

    service = module.get(AddTwoNumbersService);
  });

  it('sum of two numbers', () => {
    expect(service.add(5, 5)).toBe(10);
  });

  it('handles negative numbers', () => {
    expect(service.add(-1, 2)).toBe(1);
  });
});
