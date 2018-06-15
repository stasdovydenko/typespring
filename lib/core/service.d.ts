declare type GenericClassDecorator<T> = (target: T) => void;
interface Type<T> {
    new (...args: any[]): T;
}
export declare function Service(): GenericClassDecorator<Type<object>>;
export {};
