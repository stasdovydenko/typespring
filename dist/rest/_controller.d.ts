import 'reflect-metadata';
export declare function Controller(path: string, middleware?: Function[]): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        path: string;
        middleware: Function[];
    };
} & T;
