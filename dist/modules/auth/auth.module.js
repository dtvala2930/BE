"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const strategys_1 = require("./strategys");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const user_module_1 = require("../user/user.module");
const auth_login_controller_1 = require("./controllers/auth-login.controller");
const jwt_1 = require("@nestjs/jwt");
const app_config_1 = require("../../configs/app.config");
const auth_refresh_token_controller_1 = require("./controllers/auth-refresh-token.controller");
const gateway_module_1 = require("../../gateway/gateway.module");
const auth_profile_controller_1 = require("./controllers/auth-profile.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => gateway_module_1.GatewayModule),
            passport_1.PassportModule,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: app_config_1.JWT_SECRET_KEY,
                signOptions: { expiresIn: app_config_1.JWT_EXPIRED_TIME_TOKEN },
            }),
        ],
        controllers: [
            auth_login_controller_1.AuthLoginController,
            auth_refresh_token_controller_1.AuthRefreshTokenController,
            auth_profile_controller_1.AuthProfileController,
        ],
        providers: [auth_service_1.AuthService, strategys_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map