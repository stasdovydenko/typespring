
import { Injector } from '../di';

export class TypespringRouter {
    private _app: any;
    private _refs: any[];

    constructor(app, refs: any[]) {
        this._app = app;
        this._refs = refs;
    }

    init() {
        if (!this._app || !this._refs || !this._refs.length) {
            console.warn('Router is not initialized!');
            return;
        }
        const instances = this.initControllers();
        instances.forEach(instance => {
            const rc: any = instance['__controller'] ? instance : undefined;
            if (!rc) return;
            const controllers = rc['__controllers'];
            if (!controllers.length) return;
            controllers.forEach(c => {
                this._app.use(`/api${rc['__baseUrl']}`, rc[c](rc['__middleware']));
            });
        });
    }

    initControllers(): any[] {
        return this._refs.map(c => {
            let tokens = Reflect.getMetadata('design:paramtypes', c) || [];
            let injections = tokens.map(token => Injector.resolve<any>(token));
            return new c(...injections);
        });
    }
}

