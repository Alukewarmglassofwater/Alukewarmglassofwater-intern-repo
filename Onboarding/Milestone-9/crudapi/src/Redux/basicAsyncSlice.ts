// src/Redux/basicAsyncSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type HnItem = { id: number; title?: string; by?: string; url?: string };
type HnState = {
  item: HnItem | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: HnState = { item: null, status: 'idle', error: null };

export const fetchItem = createAsyncThunk<HnItem, number>( //action creator
  'hn/fetchItem',
  async (id, { signal, rejectWithValue }) => {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      { signal },
    );
    if (!res.ok) return rejectWithValue(`HTTP ${res.status}`) as any;
    return (await res.json()) as HnItem;
  },
);

const slice = createSlice({
  name: 'hn',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchItem.pending, (s) => {
      s.status = 'loading';
      s.error = null;
    })
      .addCase(fetchItem.fulfilled, (s, a: PayloadAction<HnItem>) => {
        s.status = 'succeeded';
        s.item = a.payload;
      })
      .addCase(fetchItem.rejected, (s, a) => {
        s.status = 'failed';
        s.error = (a.payload as string) ?? a.error.message ?? 'Error';
      });
  },
});

export default slice.reducer;
