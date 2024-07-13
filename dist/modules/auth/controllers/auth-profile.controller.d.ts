import { Response } from 'express';
import { RequestHasUserDTO } from '../../../utils/request-has-user.dto';
export declare class AuthProfileController {
    constructor();
    profile(req: RequestHasUserDTO & Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
