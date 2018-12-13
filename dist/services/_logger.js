"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var di_1 = require("../di");
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
        this._myFormat = winston_1.format.printf(function (info) {
            return info.timestamp + " [" + info.label + "] " + info.level + ": " + info.message;
        });
    }
    LoggerFactory.prototype.getLogger = function (label) {
        return winston_1.createLogger({
            format: winston_1.format.combine(winston_1.format.label({ label: label }), winston_1.format.timestamp()),
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), this._myFormat),
                    level: 'silly',
                }),
            ],
        });
    };
    LoggerFactory = __decorate([
        di_1.Service(),
        __metadata("design:paramtypes", [])
    ], LoggerFactory);
    return LoggerFactory;
}());
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=_logger.js.map