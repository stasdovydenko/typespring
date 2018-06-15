export declare function Middleware<T extends {
    new (...args: any[]): {};
}>(mw: Function[]): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        __middleware: Function[];
    };
} & T;
