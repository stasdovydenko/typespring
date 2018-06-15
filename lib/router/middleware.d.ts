export declare function Middleware<T extends {
    new (...args: any[]): {};
}>(mw: Function[]): <T_1 extends new (...args: any[]) => {}>(constructor: T_1) => {
    new (...args: any[]): {
        __middleware: Function[];
    };
} & T_1;
