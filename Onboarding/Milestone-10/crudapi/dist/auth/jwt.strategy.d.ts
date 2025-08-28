declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    awaitvalidate(payload: any): Promise<any>;
}
export {};
