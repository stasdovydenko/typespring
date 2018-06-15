export declare function RestController<T extends {
    new (...args: any[]): {};
}>(url?: string): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        __controller: boolean;
        __baseUrl: string;
    };
} & T;
