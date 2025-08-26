// src/features/counter/counterSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const fetchCount = createAsyncThunk<number, void>(
  'counter/fetchCount',
  async () => {
    const res = await fetch('/api/count');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const { value } = (await res.json()) as { value: number };
    return value;
  },
);

type State = {
  value: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};
const initialState: State = { value: 0, status: 'idle' };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (s) => {
      s.value += 1;
    },
    addBy: (s, action: PayloadAction<number>) => {
      s.value += action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (b) => {
    b.addCase(fetchCount.pending, (s) => {
      s.status = 'loading';
      s.error = undefined;
    })
      .addCase(fetchCount.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.value += a.payload;
      })
      .addCase(fetchCount.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.error.message;
      });
  },
});

export const { increment, addBy, reset } = counterSlice.actions;
export default counterSlice.reducer;
