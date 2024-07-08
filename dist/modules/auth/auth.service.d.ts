export declare class AuthService {
    createTokenAndRefreshToken(accountId: number, expiredTime?: string): Promise<string>;
    encodeWithCrypto(text: string): string;
    decodeWithCrypto(textHash: string): string;
    hashPassword(password: string): string;
    comparePassword(password: string, passwordHash: string): boolean;
    signPayload(payload: any, expiredTime: string): Promise<string>;
    decodeJwt(str: string): Promise<string | null>;
    getTimeExpires(str: string): Promise<string | null>;
    compareRefreshToken(refreshToken: string, refreshTokenHash: string): void;
}
