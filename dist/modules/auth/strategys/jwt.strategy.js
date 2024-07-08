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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const app_config_1 = require("../../../configs/app.config");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../user/user.service");
const lodash_1 = require("lodash");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(jwtService, userService) {
        super({
            jwtFromRequest: () => '',
            ignoreExpiration: true,
            secretOrKey: app_config_1.JWT_SECRET_KEY,
        });
        this.jwtService = jwtService;
        this.userService = userService;
        this.logger = new common_1.Logger(JwtStrategy_1.name);
    }
    async authenticate(req) {
        const token = req.headers['authorization'].replace('Bearer ', '');
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: app_config_1.JWT_SECRET_KEY,
            });
            const id = payload.accountId;
            const accountDB = await this.userService.getUserByField({ id });
            this.user = {
                id,
                firstName: accountDB.firstName,
                lastName: accountDB.lastName,
                email: accountDB.email,
            };
            return this.success((0, lodash_1.omit)(this.user), {});
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map