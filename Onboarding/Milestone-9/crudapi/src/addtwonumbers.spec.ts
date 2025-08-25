import { AddTwoNumbersService } from './app.service';

describe('AddTwoNumbersService', () => {
  //all tests groups under this functuin
  let service: AddTwoNumbersService;

  beforeEach(() => {
    //sets up a new instance of service for every test
    service = new AddTwoNumbersService();
  });

  it('sum of two numbers', () => {
    expect(service.add(5, 5)).toBe(10);
  });

  it('handle neg numbers', () => {
    expect(service.add(-1, 2)).toBe(1);
  });
});
