import { Logger } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserListQueryDTO } from './dto/user-list-query.dto';
export declare class UsersController {
    private readonly userService;
    logger: Logger;
    constructor(userService: UserService);
    getUsers(queryDTO: UserListQueryDTO, res: Response): Promise<Response<any, Record<string, any>>>;
}
