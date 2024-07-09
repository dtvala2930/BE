import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    createTokenAndRefreshToken(accountId: number, expiredTime?: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    encodeWithCrypto(text: string): string;
    decodeWithCrypto(textHash: string): string;
    hashPassword(password: string): string;
    comparePassword(password: string, passwordHash: string): boolean;
    compareRefreshToken(refreshToken: string, refreshTokenHash: string): true;
    refreshToken(refresh_token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    hanldeVerifyToken(token: string): any;
}
