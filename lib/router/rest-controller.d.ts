export declare function RestController<T extends {
    new (...args: any[]): {};
}>(url?: string): <T_1 extends new (...args: any[]) => {}>(constructor: T_1) => {
    new (...args: any[]): {
        __controller: boolean;
        __baseUrl: string;
    };
} & T_1;
