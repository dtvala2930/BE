"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const bcryptjs_1 = require("bcryptjs");
const paseto_1 = require("../paseto/paseto");
const app_config_1 = require("../../configs/app.config");
const constant_1 = require("../../utils/constant");
let AuthService = class AuthService {
    async createTokenAndRefreshToken(accountId, expiredTime) {
        const token = await this.signPayload({ id: accountId }, expiredTime ? expiredTime : app_config_1.JWT_EXPIRED_TIME_TOKEN);
        return token;
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
    async signPayload(payload, expiredTime) {
        return await (0, paseto_1.signToken)(payload, expiredTime);
    }
    async decodeJwt(str) {
        try {
            const jwtObj = await (0, paseto_1.verifyToken)(str);
            return jwtObj.id;
        }
        catch (e) {
            return null;
        }
    }
    async getTimeExpires(str) {
        try {
            const jwtObj = await (0, paseto_1.verifyToken)(str);
            return jwtObj.exp;
        }
        catch (e) {
            return null;
        }
    }
    compareRefreshToken(refreshToken, refreshTokenHash) {
        const passwordHashWithCrypto = this.encodeWithCrypto(refreshToken);
        const isValidRefreshToken = (0, bcryptjs_1.compareSync)(passwordHashWithCrypto, refreshTokenHash);
        if (!isValidRefreshToken) {
            throw new common_1.BadRequestException('refresh-token-invalid');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map