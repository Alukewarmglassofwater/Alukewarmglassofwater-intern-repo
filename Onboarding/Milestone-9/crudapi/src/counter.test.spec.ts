import { Counter } from './app.service';

describe('Counter', () => {
  it('starts at 0 by default', () => {
    const c = new Counter();
    expect(c.value).toBe(0);
  });

  it('honors custom initial value', () => {
    const c = new Counter(10);
    expect(c.value).toBe(10);
  });

  it('increment() returns the new value and updates state', () => {
    const c = new Counter();
    expect(c.increment()).toBe(1); // return value
    expect(c.value).toBe(1); // state
  });

  it('increment(step) with custom step', () => {
    const c = new Counter();
    expect(c.increment(5)).toBe(5);
    expect(c.value).toBe(5);
  });

  it('decrement() returns the new value and updates state', () => {
    const c = new Counter(2);
    expect(c.decrement()).toBe(1);
    expect(c.value).toBe(1);
  });

  it('decrement(step) with custom step', () => {
    const c = new Counter(5);
    expect(c.decrement(2)).toBe(3);
    expect(c.value).toBe(3);
  });

  it('reset() sets value to 0 and returns void', () => {
    const c = new Counter(3);
    expect(c.reset()).toBeUndefined(); // assert void
    expect(c.value).toBe(0);
  });

  it('zero step is a no-op', () => {
    const c = new Counter(7);
    expect(c.increment(0)).toBe(7);
    expect(c.value).toBe(7);
    expect(c.decrement(0)).toBe(7);
    expect(c.value).toBe(7);
  });

  it('roundtrips: inc(n) then dec(n) returns to original', () => {
    const c = new Counter(4);
    c.increment(3);
    c.decrement(3);
    expect(c.value).toBe(4);
  });

  it('negative steps behave like the opposite operation', () => {
    const a = new Counter(10);
    const b = new Counter(10);
    a.increment(-3); // same as decrement(3)
    b.decrement(3);
    expect(a.value).toBe(b.value);
  });

  it('supports floating point steps', () => {
    const c = new Counter(1);
    expect(c.increment(2.5)).toBe(3.5);
    expect(c.decrement(0.5)).toBe(3.0);
  });
});
