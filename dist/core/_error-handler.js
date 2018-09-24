"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleError(err, res) {
    var msg = err.message;
    console.error(msg || 'UNEXPECTED ERROR');
    var status = err.status || 500;
    res.status(status).send({ err: msg });
}
exports.handleError = handleError;
//# sourceMappingURL=_error-handler.js.map