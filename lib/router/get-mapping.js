"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var async_middleware_1 = require("async-middleware");
function GetMapping(url) {
    if (!url)
        url = '/';
    if (url.substring(0, 1) !== '/')
        url = "/" + url;
    return function (target, propertyKey, descriptor) {
        var initialValue = descriptor.value;
        if (!target['__controllers']) {
            target['__controllers'] = [];
        }
        target['__controllers'].push(propertyKey);
        descriptor.value = function () {
            var router = express.Router();
            var middleware = arguments[0];
            return router.get(url, middleware || [], async_middleware_1.wrap(initialValue.bind(this)));
        };
        return descriptor;
    };
}
exports.GetMapping = GetMapping;
//# sourceMappingURL=get-mapping.js.map