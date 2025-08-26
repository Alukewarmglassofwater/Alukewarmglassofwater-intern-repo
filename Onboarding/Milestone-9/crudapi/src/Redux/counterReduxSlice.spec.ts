// src/features/counter/counterSlice.test.ts
import reducer, { increment, addBy, reset } from './counterReduxSlice';

describe('counter reducer', () => {
  test('returns initial state when passed an undefined state', () => {
    const next = reducer(undefined, { type: '@@INIT' });
    expect(next).toEqual({ value: 0, status: 'idle' });
  });

  test('handles increment', () => {
    const next = reducer({ value: 1, status: 'idle' }, increment());
    expect(next.value).toBe(2);
  });

  test('handles addBy', () => {
    const next = reducer({ value: 2, status: 'idle' }, addBy(5));
    expect(next.value).toBe(7);
  });

  test('handles reset', () => {
    const prev = { value: 99, status: 'succeeded' as const, error: undefined };
    const next = reducer(prev, reset());
    expect(next).toEqual({ value: 0, status: 'idle' });
  });
});
