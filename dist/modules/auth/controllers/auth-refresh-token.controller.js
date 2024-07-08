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
var AuthRefreshTokenController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRefreshTokenController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const constant_1 = require("../../../utils/constant");
const user_service_1 = require("../../user/user.service");
let AuthRefreshTokenController = AuthRefreshTokenController_1 = class AuthRefreshTokenController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthRefreshTokenController_1.name);
    }
    async loginLocal({ refresh_token }) {
        return this.authService.refreshToken(refresh_token);
    }
};
exports.AuthRefreshTokenController = AuthRefreshTokenController;
__decorate([
    (0, common_1.Post)(`${constant_1.API_PREFIX_PATH}/auth/refresh-token`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthRefreshTokenController.prototype, "loginLocal", null);
exports.AuthRefreshTokenController = AuthRefreshTokenController = AuthRefreshTokenController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthRefreshTokenController);
//# sourceMappingURL=auth-refresh-token.controller.js.map