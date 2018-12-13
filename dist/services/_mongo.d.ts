import { MongoClient, Collection, DbCollectionOptions } from 'mongodb';
import { IMongoConfig } from '../models';
export declare class MongoService {
    private _client;
    private _databaseName;
    private _logger;
    constructor();
    connect(config: IMongoConfig): Promise<MongoClient>;
    collection(colName: string): Collection;
    createCollection(colName: string, options?: DbCollectionOptions): Promise<Collection<any>>;
    removeCollection(colName: string): Promise<void>;
    terminate(): void;
}
