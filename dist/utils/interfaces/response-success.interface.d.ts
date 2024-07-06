import { MetaDataInterface } from './meta-data.interface';
export interface ResponseSuccessInterface {
    statusCode: number;
    success: string;
    data: any;
    metaData?: MetaDataInterface;
}
