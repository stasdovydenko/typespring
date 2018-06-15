import { Injector } from '../di';

export function Service() {
    return (target) => {
        Injector.register(target);
    };
};