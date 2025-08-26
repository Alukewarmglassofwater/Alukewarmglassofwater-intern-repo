// src/app.service.spec.ts (or wherever your service lives)
import { Test, TestingModule } from '@nestjs/testing';
import { SubtractTwoNumbersService } from './app.service';

describe('SubtractTwoNumbersService (TestingModule)', () => {
  let module: TestingModule;
  let service: SubtractTwoNumbersService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [SubtractTwoNumbersService],
    }).compile();

    service = module.get(SubtractTwoNumbersService);
  });

  it('sub two numbers', () => {
    expect(service.sub(5, 5)).toBe(0);
  });

  it('handles negative numbers', () => {
    expect(service.sub(-1, 2)).toBe(-3);
  });
});
