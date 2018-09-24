import { Injector } from './_injector';

export function Service() {
    return (target) => {
        return Injector.register(target);
    };
}