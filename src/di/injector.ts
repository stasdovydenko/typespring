import 'reflect-metadata';

export class Injector {
    public static instances: Map<string, any> = new Map();

    public static register(target): void {
        const registered = Injector.resolve(target);
        if (registered) {
            throw new Error(`[DI ERROR]: service with name ${target.name} already registered!`);
        }
        let tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        let injections = tokens.map(token => Injector.resolve<any>(token));
        Injector.instances.set(target.name, new target(...injections));
    }

    public static resolve<T>(target): T {
        var t = Reflect.getMetadata("design:type", target);
        console.log(t);
        const name = target.name;
        return Injector.instances.get(name);
    }
};



