import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { join } from 'path';
import { createServer } from 'http';
import * as fileUpload from 'express-fileupload';
import 'reflect-metadata';
import { Injector } from '../di/_injector';
import { LoggerFactory } from '../services';

interface IServerOptions {
    port: number | string;
    cors?: boolean;
    services?: any[];
    controllers?: any[];
    repositories?: any[];
}

export function Server(options: IServerOptions) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            app = express();
            server = createServer(this.app);

            constructor(...args: any[]) {
                super(...args);
                this.run();
            }

            run(): void {
                this.app.use('/static', express.static(join(__dirname, '..', 'assets', 'static')));
                this.app.use('/public', express.static(join(__dirname, '..', 'assets', 'public')));
                this.app.use(bodyParser.urlencoded({
                    extended: false,
                }));
                this.app.use(bodyParser.json());
                if (options.cors) {
                    this.app.use(cors());
                }
                this.app.use(fileUpload({preserveExtension: true}));
                this.initControllers(options.controllers);

                this.server.listen(options.port, () => {
                    const loggerFactory = new LoggerFactory();
                    const logger = loggerFactory.getLogger('SYSTEM');
                    logger.info(`Node Express server listening on http://localhost:${options.port}`);
                });
            }

            initControllers(controllers: any[]): void {
                const instances = controllers.map(c => {
                    const tokens = Reflect.getMetadata('design:paramtypes', c) || [];
                    const injections = tokens.map(token => Injector.resolve<any>(token));
                    return new c(...injections);
                });
                instances.forEach(instance => {
                    const requests = instance['__requests'];
                    if (!requests.length) return;
                    requests.forEach(r => {
                        this.app.use(`/api${instance.path}`, instance[r](instance.middleware));
                    });
                });
            }
        };
    };
}