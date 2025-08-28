"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchItem = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = { item: null, status: 'idle', error: null };
exports.fetchItem = (0, toolkit_1.createAsyncThunk)('hn/fetchItem', async (id, { signal, rejectWithValue }) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { signal });
    if (!res.ok)
        return rejectWithValue(`HTTP ${res.status}`);
    return (await res.json());
});
const slice = (0, toolkit_1.createSlice)({
    name: 'hn',
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(exports.fetchItem.pending, (s) => {
            s.status = 'loading';
            s.error = null;
        })
            .addCase(exports.fetchItem.fulfilled, (s, a) => {
            s.status = 'succeeded';
            s.item = a.payload;
        })
            .addCase(exports.fetchItem.rejected, (s, a) => {
            s.status = 'failed';
            s.error = a.payload ?? a.error.message ?? 'Error';
        });
    },
});
exports.default = slice.reducer;
//# sourceMappingURL=basicAsyncSlice.js.map