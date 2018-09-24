"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _injector_1 = require("./_injector");
function Service() {
    return function (target) {
        return _injector_1.Injector.register(target);
    };
}
exports.Service = Service;
//# sourceMappingURL=_service.js.map