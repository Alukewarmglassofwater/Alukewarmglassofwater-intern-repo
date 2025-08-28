export declare const fetchCount: import("@reduxjs/toolkit").AsyncThunk<number, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
type State = {
    value: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
};
export declare const increment: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"counter/increment">, addBy: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "counter/addBy">, reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"counter/reset">;
declare const _default: import("redux").Reducer<import("immer").WritableDraft<State>>;
export default _default;
