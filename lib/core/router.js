"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = require("../di");
var TypespringRouter = /** @class */ (function () {
    function TypespringRouter(app, refs) {
        this._app = app;
        this._refs = refs;
    }
    TypespringRouter.prototype.init = function () {
        var _this = this;
        if (!this._app || !this._refs || !this._refs.length) {
            console.warn('Router is not initialized!');
            return;
        }
        var instances = this.initControllers();
        instances.forEach(function (instance) {
            var rc = instance['__controller'] ? instance : undefined;
            if (!rc)
                return;
            var controllers = rc['__controllers'];
            if (!controllers.length)
                return;
            controllers.forEach(function (c) {
                _this._app.use("/api" + rc['__baseUrl'], rc[c](rc['__middleware']));
            });
        });
    };
    TypespringRouter.prototype.initControllers = function () {
        return this._refs.map(function (c) {
            var tokens = Reflect.getMetadata('design:paramtypes', c) || [];
            var injections = tokens.map(function (token) { return di_1.Injector.resolve(token); });
            return new (c.bind.apply(c, [void 0].concat(injections)))();
        });
    };
    return TypespringRouter;
}());
exports.TypespringRouter = TypespringRouter;
//# sourceMappingURL=router.js.map