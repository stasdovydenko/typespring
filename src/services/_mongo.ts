import { MongoClient, Collection, DbCollectionOptions } from 'mongodb';
import { Service } from '../di/_service';
import { Logger } from 'winston';
import { IMongoConfig } from '../models';
import { LoggerFactory } from './_logger';

@Service()
export class MongoService {
    private _client: MongoClient;
    private _databaseName: string;
    private _logger: Logger;

    constructor() {
        const loggerFactory = new LoggerFactory();
        this._logger = loggerFactory.getLogger('MONGO');
    }

    connect(config: IMongoConfig): Promise<MongoClient> {
        this._logger.info('Connecting to database...');
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.url, {useNewUrlParser: true}, (err, c) => {
                if (err) {
                    this._logger.error('Mongo connection error', err);
                    reject(err);
                } else {
                    this._databaseName = config.dbname;
                    this._client = c;
                    this._logger.info('Connected to database');
                    resolve(this._client);
                }
            });
        });
    }

    collection(colName: string): Collection {
        if (!this._client) {
            this._logger.error('Not connected to Mongo instance');
        }
        return this._client.db(this._databaseName).collection(colName);
    }

    createCollection(colName: string, options?: DbCollectionOptions): Promise<Collection<any>> {
        if (!this._client) {
            this._logger.error('Not connected to Mongo instance');
        }
        return this._client.db(this._databaseName).createCollection(colName, options || {});
    }

    removeCollection(colName: string): Promise<void> {
        if (!this._client) {
            this._logger.error('Not connected to Mongo instance');
        }
        return this._client.db(this._databaseName).collection(colName).drop();
    }

    terminate(): void {
        if (!this._client) {
            this._logger.error('Not connected to Mongo instance');
        }
        this._client.close();
    }
}