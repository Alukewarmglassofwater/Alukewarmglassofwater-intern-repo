type HnItem = {
    id: number;
    title?: string;
    by?: string;
    url?: string;
};
type HnState = {
    item: HnItem | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};
export declare const fetchItem: import("@reduxjs/toolkit").AsyncThunk<HnItem, number, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("redux").Reducer<HnState>;
export default _default;
