import { Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
export declare class AuthRefreshTokenController {
    private readonly authService;
    private readonly userService;
    logger: Logger;
    constructor(authService: AuthService, userService: UserService);
    loginLocal({ refresh_token }: {
        refresh_token: any;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
