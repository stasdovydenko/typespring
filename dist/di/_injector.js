"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Injector = /** @class */ (function () {
    function Injector() {
    }
    Injector.register = function (target) {
        var registered = Injector.resolve(target);
        if (registered) {
            throw new Error("[DI ERROR]: service with name " + target.name + " already registered!");
        }
        var tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        var injections = tokens.map(function (token) { return Injector.resolve(token); });
        Injector.instances.set(target.name, new (target.bind.apply(target, [void 0].concat(injections)))());
    };
    Injector.resolve = function (target) {
        var name = target.name;
        return Injector.instances.get(name);
    };
    Injector.instances = new Map();
    return Injector;
}());
exports.Injector = Injector;
//# sourceMappingURL=_injector.js.map