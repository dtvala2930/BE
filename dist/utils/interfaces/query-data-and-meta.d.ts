import { MetaDataInterface } from './meta-data.interface';
export declare class QueryDataAndMeta<T> {
    data: T[];
    metaData: MetaDataInterface;
    constructor(paginationResults: IDataAndQueryParams<T>);
}
interface IDataAndQueryParams<T> {
    data: T[];
    queryParams: any;
    total: number;
}
export {};
