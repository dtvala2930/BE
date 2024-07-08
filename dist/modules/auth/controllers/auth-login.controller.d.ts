import { Logger } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth.service';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { UserService } from '../../user/user.service';
export declare class AuthLoginController {
    private readonly authService;
    private readonly userService;
    logger: Logger;
    constructor(authService: AuthService, userService: UserService);
    loginLocal(authLoginDto: AuthLoginDTO, res: Response): Promise<Response<any, Record<string, any>>>;
}
