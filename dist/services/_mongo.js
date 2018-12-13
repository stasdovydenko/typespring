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
var mongodb_1 = require("mongodb");
var _service_1 = require("../di/_service");
var _logger_1 = require("./_logger");
var MongoService = /** @class */ (function () {
    function MongoService() {
        var loggerFactory = new _logger_1.LoggerFactory();
        this._logger = loggerFactory.getLogger('MONGO');
    }
    MongoService.prototype.connect = function (config) {
        var _this = this;
        this._logger.info('Connecting to database...');
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(config.url, { useNewUrlParser: true }, function (err, c) {
                if (err) {
                    _this._logger.error('Mongo connection error', err);
                    reject(err);
                }
                else {
                    _this._databaseName = config.dbname;
                    _this._client = c;
                    _this._logger.info('Connected to database');
                    resolve(_this._client);
                }
            });
        });
    };
    MongoService.prototype.collection = function (colName) {
        if (!this._client) {
            this._logger.error('Not connected to Mongo instance');
        }
        return this._client.db(this._databaseName).collection(colName);
    };
    MongoService.prototype.createCollection = function (colName, options) {
        if (!this._client) {
            this._logger.error('Not connected to Mongo instance');
        }
        return this._client.db(this._databaseName).createCollection(colName, options || {});
    };
    MongoService.prototype.removeCollection = function (colName) {
        if (!this._client) {
            this._logger.error('Not connected to Mongo instance');
        }
        return this._client.db(this._databaseName).collection(colName).drop();
    };
    MongoService.prototype.terminate = function () {
        if (!this._client) {
            this._logger.error('Not connected to Mongo instance');
        }
        this._client.close();
    };
    MongoService = __decorate([
        _service_1.Service(),
        __metadata("design:paramtypes", [])
    ], MongoService);
    return MongoService;
}());
exports.MongoService = MongoService;
//# sourceMappingURL=_mongo.js.map