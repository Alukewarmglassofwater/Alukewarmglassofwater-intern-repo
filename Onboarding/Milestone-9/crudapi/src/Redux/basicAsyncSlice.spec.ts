import { configureStore } from '@reduxjs/toolkit';
import reducer, { fetchItem } from './basicAsyncSlice';

describe('basicAsyncSlice', () => {
  test('module shape', () => {
    expect(typeof reducer).toBe('function'); // default export is reducer
    expect(typeof fetchItem).toBe('function'); // thunk
  });

  describe('reducer (lifecycle actions)', () => {
    test('initial state', () => {
      const s = reducer(undefined, { type: '@@INIT' } as any);
      expect(s).toEqual({ item: null, status: 'idle', error: null });
    });

    test('pending -> loading', () => {
      const s = reducer(undefined, fetchItem.pending('req1', 123));
      expect(s).toEqual({ item: null, status: 'loading', error: null });
    });

    test('fulfilled -> succeeded + item', () => {
      const prev = { item: null, status: 'loading' as const, error: null };
      const payload = { id: 1, title: 'ok' };
      const s = reducer(prev, fetchItem.fulfilled(payload, 'req1', 1));
      expect(s.status).toBe('succeeded');
      expect(s.item).toEqual(payload);
    });

    test('rejected -> failed + error', () => {
      const prev = { item: null, status: 'loading' as const, error: null };
      const err = Object.assign(new Error('boom'), { name: 'Error' });
      const s = reducer(prev, fetchItem.rejected(err, 'req1', 1));
      expect(s.status).toBe('failed');
      expect(s.error).toBe('boom');
    });

    test('rejectedWithValue -> uses payload message', () => {
      const prev = { item: null, status: 'loading' as const, error: null };
      const action: any = {
        type: fetchItem.rejected.type,
        payload: 'HTTP 500',
      };
      const s = reducer(prev, action);
      expect(s.status).toBe('failed');
      expect(s.error).toBe('HTTP 500');
    });
  });

  describe('thunk (store integration)', () => {
    const originalFetch = global.fetch as any;
    const makeStore = () => configureStore({ reducer: { hn: reducer } });

    afterEach(() => {
      global.fetch = originalFetch;
      jest.resetAllMocks();
    });

    test('success path updates state', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ id: 8863, title: 'Test Title' }),
      });

      const store = makeStore();
      await store.dispatch(fetchItem(8863) as any);

      const s = store.getState().hn;
      expect(s.status).toBe('succeeded');
      expect(s.item).toEqual({ id: 8863, title: 'Test Title' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://hacker-news.firebaseio.com/v0/item/8863.json',
        expect.objectContaining({ signal: expect.anything() }), // AbortSignal may be undefined in Node
      );
    });

    test('non-OK -> failed with message', async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });

      const store = makeStore();
      await store.dispatch(fetchItem(999) as any);

      const s = store.getState().hn;
      expect(s.status).toBe('failed');
      expect(s.error).toMatch(/HTTP 500/);
    });

    test('network error -> failed', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('boom'));

      const store = makeStore();
      await store.dispatch(fetchItem(1) as any);

      const s = store.getState().hn;
      expect(s.status).toBe('failed');
      expect(s.error).toMatch(/boom/);
    });
  });
});
