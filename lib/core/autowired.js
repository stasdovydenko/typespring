"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = require("../di");
require("reflect-metadata");
function Autowired() {
    return function (target, property) {
        var t = Reflect.getMetadata("design:type", target, property);
        target[property] = di_1.Injector.resolve(t);
    };
}
exports.Autowired = Autowired;
//# sourceMappingURL=autowired.js.map