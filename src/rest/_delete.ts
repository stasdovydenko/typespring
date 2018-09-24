import * as express from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { handleError } from '../core';

export function DeleteRequest<T>(url: string, middleware: Function[] = [], disableResponse?: boolean) {
    if (url.substring(0, 1) !== '/') url = `/${url}`;
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const initialValue = descriptor.value;
        if (!target['__requests']) {
            target['__requests'] = [];
        }
        target['__requests'].push(propertyKey);
        descriptor.value = function () {
            const router = express.Router();
            const groupMiddleware = arguments[0];
            return router.delete(url, [...groupMiddleware, ...middleware], async (req: Request, res: Response) => {
                try {
                    const r: T = await initialValue.call(this, req, res);
                    if (res.headersSent || disableResponse) return;
                    res.send(r);
                } catch (e) {
                    if (res.headersSent) return;
                    handleError(e, res);
                }
            });
        };
        return descriptor;
    };
}