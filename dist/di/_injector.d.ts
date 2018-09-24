import 'reflect-metadata';
export declare class Injector {
    static instances: Map<string, any>;
    static register(target: any): void;
    static resolve<T>(target: any): T;
}
