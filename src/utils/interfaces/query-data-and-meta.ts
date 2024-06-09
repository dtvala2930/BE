import { MetaDataInterface } from './meta-data.interface';

export class QueryDataAndMeta<T> {
  public data: T[];
  public metaData: MetaDataInterface;

  constructor(paginationResults: IDataAndQueryParams<T>) {
    this.data = paginationResults.data;
    this.metaData = {
      ...paginationResults.queryParams,
      total: paginationResults.total,
    };
  }
}

interface IDataAndQueryParams<T> {
  data: T[];
  queryParams: any;
  total: number;
}
