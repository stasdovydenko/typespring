import { Injector } from '../di/_injector';

export function Repository() {
    return (target) => {
        return Injector.register(target);
    };
}