"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.addBy = exports.increment = exports.fetchCount = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.fetchCount = (0, toolkit_1.createAsyncThunk)('counter/fetchCount', async () => {
    const res = await fetch('/api/count');
    if (!res.ok)
        throw new Error('HTTP ' + res.status);
    const { value } = (await res.json());
    return value;
});
const initialState = { value: 0, status: 'idle' };
const counterSlice = (0, toolkit_1.createSlice)({
    name: 'counter',
    initialState,
    reducers: {
        increment: (s) => {
            s.value += 1;
        },
        addBy: (s, action) => {
            s.value += action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (b) => {
        b.addCase(exports.fetchCount.pending, (s) => {
            s.status = 'loading';
            s.error = undefined;
        })
            .addCase(exports.fetchCount.fulfilled, (s, a) => {
            s.status = 'succeeded';
            s.value += a.payload;
        })
            .addCase(exports.fetchCount.rejected, (s, a) => {
            s.status = 'failed';
            s.error = a.error.message;
        });
    },
});
_a = counterSlice.actions, exports.increment = _a.increment, exports.addBy = _a.addBy, exports.reset = _a.reset;
exports.default = counterSlice.reducer;
//# sourceMappingURL=counterReduxSlice.js.map