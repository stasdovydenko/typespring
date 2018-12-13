/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference types="node" />
import 'reflect-metadata';
interface IServerOptions {
    port: number | string;
    cors?: boolean;
    services?: any[];
    controllers?: any[];
    repositories?: any[];
}
export declare function Server(options: IServerOptions): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        app: import("express-serve-static-core").Express;
        server: import("http").Server;
        run(): void;
        initControllers(controllers: any[]): void;
    };
} & T;
export {};
