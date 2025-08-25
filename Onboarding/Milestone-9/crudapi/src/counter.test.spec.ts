import { Counter } from './app.service';

describe('Counter', () => {
  let counter: Counter;

  beforeEach(() => {
    counter = new Counter(); // starts at 0
  });

  it('starts at 0 by default', () => {
    expect(counter.value).toBe(0);
  });

  it('increments by 1 by default', () => {
    counter.increment();
    expect(counter.value).toBe(1);
  });

  it('increments by a custom step', () => {
    counter.increment(5);
    expect(counter.value).toBe(5);
  });

  it('decrements by 1 by default', () => {
    counter.increment(2);
    counter.decrement();
    expect(counter.value).toBe(1);
  });

  it('resets to 0', () => {
    counter.increment(3);
    counter.reset();
    expect(counter.value).toBe(0);
  });
});
