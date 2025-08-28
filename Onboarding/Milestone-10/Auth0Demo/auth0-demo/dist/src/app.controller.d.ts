export declare class DemoController {
    getPublic(): {
        ok: boolean;
        route: string;
    };
    getProtected(req: any): {
        ok: boolean;
        route: string;
        user: any;
    };
}
