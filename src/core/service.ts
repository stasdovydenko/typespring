import { Injector } from '../di';

type GenericClassDecorator<T> = (target: T) => void;

interface Type<T> {
    new(...args: any[]): T;
}

export function Service(): GenericClassDecorator<Type<object>> {
    return (target: Type<object>) => {
        Injector.register(target);
    };
};