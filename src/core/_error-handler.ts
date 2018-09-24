import { Response } from "express";

export function handleError(err: any, res: Response): void {
    const msg = err.message;
    console.error(msg || 'UNEXPECTED ERROR');
    const status = err.status || 500;
    res.status(status).send({ err: msg });
}