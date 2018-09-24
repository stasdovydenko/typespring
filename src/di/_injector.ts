import 'reflect-metadata';

export class Injector {
    static instances: Map<string, any> = new Map();

    static register(target): void {
        const registered = Injector.resolve(target);
        if (registered) {
            throw new Error(`[DI ERROR]: service with name ${target.name} already registered!`);
        }
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map(token => Injector.resolve<any>(token));
        Injector.instances.set(target.name, new target(...injections));
    }

    static resolve<T>(target): T {
        const name = target.name;
        return Injector.instances.get(name);
    }
}
