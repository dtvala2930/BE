"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const bcryptjs_1 = require("bcryptjs");
const app_config_1 = require("../../configs/app.config");
const constant_1 = require("../../utils/constant");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async createTokenAndRefreshToken(accountId, expiredTime) {
        const access_token = await this.jwtService.signAsync({ accountId }, { expiresIn: app_config_1.JWT_EXPIRED_TIME_TOKEN });
        const refresh_token = await this.jwtService.signAsync({ accountId }, {
            secret: app_config_1.JWT_SECRET_KEY,
            expiresIn: expiredTime,
        });
        await this.userService.updateUser(accountId, { refresh_token });
        return { access_token, refresh_token };
    }
    encodeWithCrypto(text) {
        try {
            const cipher = (0, crypto_1.createCipheriv)(app_config_1.CIPHER_MODE, app_config_1.CIPHER_KEY, app_config_1.CIPHER_IV);
            const encrypted = cipher.update(text, 'utf8', 'base64');
            return encrypted + cipher.final('base64');
        }
        catch (error) {
            return null;
        }
    }
    decodeWithCrypto(textHash) {
        try {
            const decipher = (0, crypto_1.createDecipheriv)(app_config_1.CIPHER_MODE, app_config_1.CIPHER_KEY, app_config_1.CIPHER_IV);
            const decrypted = decipher.update(textHash, 'base64', 'utf8');
            return decrypted + decipher.final('utf8');
        }
        catch (error) {
            return null;
        }
    }
    hashPassword(password) {
        const passwordHashWithCrypto = this.encodeWithCrypto(password);
        const passwordHash = (0, bcryptjs_1.hashSync)(passwordHashWithCrypto, constant_1.SALT_ROUNDS);
        return passwordHash;
    }
    comparePassword(password, passwordHash) {
        const passwordHashWithCrypto = this.encodeWithCrypto(password);
        const comparePass = (0, bcryptjs_1.compareSync)(passwordHashWithCrypto, passwordHash);
        return comparePass;
    }
    compareRefreshToken(refreshToken, refreshTokenHash) {
        const passwordHashWithCrypto = this.encodeWithCrypto(refreshToken);
        const isValidRefreshToken = (0, bcryptjs_1.compareSync)(passwordHashWithCrypto, refreshTokenHash);
        if (!isValidRefreshToken) {
            throw new common_1.BadRequestException('refresh-token-invalid');
        }
        return isValidRefreshToken;
    }
    async refreshToken(refresh_token) {
        try {
            const verify = await this.jwtService.verifyAsync(refresh_token, {
                secret: app_config_1.JWT_SECRET_KEY,
            });
            const checkExistToken = await this.userService.getUserByField({
                id: verify.id,
                refresh_token,
            });
            if (checkExistToken) {
                return this.createTokenAndRefreshToken(verify.accountId, app_config_1.JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN);
            }
            else {
                throw new common_1.HttpException('Refresh token not valid', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Refresh token is not valid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    hanldeVerifyToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            return payload;
        }
        catch (error) {
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.UNAUTHORIZED }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map