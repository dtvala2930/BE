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
const paseto_1 = require("../../paseto/paseto");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: () => '',
            ignoreExpiration: true,
            secretOrKey: app_config_1.JWT_SECRET_KEY,
        });
        this.logger = new common_1.Logger(JwtStrategy_1.name);
    }
    async authenticate(req) {
        const token = req.headers['authorization'];
        const payload = await (0, paseto_1.verifyToken)(token?.replace('Bearer ', ''));
        if (!payload) {
            return this.fail('login-unauthorized', 401);
        }
        const id = +payload?.id;
        const accountDB = {
            id: 1,
            firstName: 'Nguyen',
            lastName: 'Tan',
            email: 'dt.duytan1999@gmail.com',
        };
        if (!accountDB) {
            return this.fail('login-unauthorized', 401);
        }
        this.user = {
            id,
            firstName: accountDB.firstName,
            lastName: accountDB.lastName,
            email: accountDB.email,
        };
        return this.success(this.user, {});
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map