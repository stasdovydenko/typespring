import { Logger } from 'winston';
export declare class LoggerFactory {
    private _myFormat;
    constructor();
    getLogger(label: string): Logger;
}
