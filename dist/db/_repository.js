"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _injector_1 = require("../di/_injector");
function Repository() {
    return function (target) {
        return _injector_1.Injector.register(target);
    };
}
exports.Repository = Repository;
//# sourceMappingURL=_repository.js.map