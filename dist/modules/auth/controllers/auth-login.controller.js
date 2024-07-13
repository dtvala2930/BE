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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthLoginController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginController = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const auth_service_1 = require("../auth.service");
const auth_login_dto_1 = require("../dto/auth-login.dto");
const constant_1 = require("../../../utils/constant");
const app_config_1 = require("../../../configs/app.config");
const user_service_1 = require("../../user/user.service");
let AuthLoginController = AuthLoginController_1 = class AuthLoginController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthLoginController_1.name);
    }
    async loginLocal(authLoginDto, res) {
        const resData = {
            statusCode: common_1.HttpStatus.OK,
            success: 'login-success',
            data: null,
        };
        try {
            const accountDB = await this.userService.getUserByField({
                email: authLoginDto.email,
            });
            if (accountDB === null) {
                throw new common_1.HttpException('login-unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
            const { password } = accountDB;
            const checkPassword = this.authService.comparePassword(authLoginDto.password, password);
            if (!checkPassword) {
                throw new common_1.HttpException('login-unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
            const { access_token: token } = await this.authService.createTokenAndRefreshToken(accountDB.id, app_config_1.JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN);
            const { exp: expires } = await this.authService.hanldeVerifyToken(token);
            (0, lodash_1.assign)(resData, {
                data: { token, expires },
            });
        }
        catch (error) {
            this.logger.error(JSON.stringify(error, null, 4));
            throw new common_1.HttpException(error.message, error.status);
        }
        return res.status(common_1.HttpStatus.OK).json(resData);
    }
};
exports.AuthLoginController = AuthLoginController;
__decorate([
    (0, common_1.Post)(`${constant_1.API_PREFIX_PATH}/auth/login`),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.AuthLoginDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthLoginController.prototype, "loginLocal", null);
exports.AuthLoginController = AuthLoginController = AuthLoginController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthLoginController);
//# sourceMappingURL=auth-login.controller.js.map