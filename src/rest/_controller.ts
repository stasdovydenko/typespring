import 'reflect-metadata';

export function Controller(path: string, middleware: Function[] = []) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            path = path;
            middleware = middleware;
            constructor(...args: any[]) {
                super(...args);
            }
        };
    };
}