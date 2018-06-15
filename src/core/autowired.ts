import { Injector } from '../di';
import 'reflect-metadata';

export function Autowired() {
    return (target: any, property: string) => {
        var t = Reflect.getMetadata("design:type", target, property);
        target[property] = Injector.resolve(t);
    };
}