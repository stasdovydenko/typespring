import { createLogger, format, transports, Logger } from 'winston';
import { Service } from '../di';

@Service()
export class LoggerFactory {
    private _myFormat;

    constructor() {
        this._myFormat = format.printf(info => {
            return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
        });
    }

    getLogger(label: string): Logger {
        return createLogger({
            format: format.combine(
                format.label({ label: label }),
                format.timestamp(),
            ),
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        this._myFormat,
                    ),
                    level: 'silly',
                }),
            ],
        });
    }
}