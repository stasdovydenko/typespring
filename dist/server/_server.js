"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path_1 = require("path");
var http_1 = require("http");
var fileUpload = require("express-fileupload");
require("reflect-metadata");
var _injector_1 = require("../di/_injector");
var services_1 = require("../services");
function Server(options) {
    return function (constructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                _this.app = express();
                _this.server = http_1.createServer(_this.app);
                _this.run();
                return _this;
            }
            class_1.prototype.run = function () {
                this.app.use('/static', express.static(path_1.join(__dirname, '..', 'assets', 'static')));
                this.app.use('/public', express.static(path_1.join(__dirname, '..', 'assets', 'public')));
                this.app.use(bodyParser.urlencoded({
                    extended: false,
                }));
                this.app.use(bodyParser.json());
                if (options.cors) {
                    this.app.use(cors());
                }
                this.app.use(fileUpload({ preserveExtension: true }));
                this.initControllers(options.controllers);
                this.server.listen(options.port, function () {
                    var loggerFactory = new services_1.LoggerFactory();
                    var logger = loggerFactory.getLogger('SYSTEM');
                    logger.info("Node Express server listening on http://localhost:" + options.port);
                });
            };
            class_1.prototype.initControllers = function (controllers) {
                var _this = this;
                var instances = controllers.map(function (c) {
                    var tokens = Reflect.getMetadata('design:paramtypes', c) || [];
                    var injections = tokens.map(function (token) { return _injector_1.Injector.resolve(token); });
                    return new (c.bind.apply(c, [void 0].concat(injections)))();
                });
                instances.forEach(function (instance) {
                    var requests = instance['__requests'];
                    if (!requests.length)
                        return;
                    requests.forEach(function (r) {
                        _this.app.use("/api" + instance.path, instance[r](instance.middleware));
                    });
                });
            };
            return class_1;
        }(constructor));
    };
}
exports.Server = Server;
//# sourceMappingURL=_server.js.map