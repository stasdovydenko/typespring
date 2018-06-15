import * as express from 'express';
import { wrap } from 'async-middleware';

export function GetMapping(url: string) {
    if (!url) url = '/';
    if (url.substring(0, 1) !== '/') url = `/${url}`;
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const initialValue = descriptor.value;
        if (!target['__controllers']) {
            target['__controllers'] = [];
        }
        target['__controllers'].push(propertyKey);
        descriptor.value = function () {
            const router = express.Router();
            const middleware = arguments[0];
            return router.get(url, middleware || [], wrap(initialValue.bind(this)));
        }
        return descriptor;
    };
}