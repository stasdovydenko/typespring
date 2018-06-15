"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = require("../di");
function Service() {
    return function (target) {
        di_1.Injector.register(target);
    };
}
exports.Service = Service;
;
//# sourceMappingURL=service.js.map