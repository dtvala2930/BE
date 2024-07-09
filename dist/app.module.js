"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const throttler_1 = require("@nestjs/throttler");
const constant_1 = require("./utils/constant");
const user_module_1 = require("./modules/user/user.module");
const no_x_powered_by_middleware_1 = require("./middlewares/no-x-powered-by.middleware");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const secure_header_middleware_1 = require("./middlewares/secure-header.middleware");
const auth_module_1 = require("./modules/auth/auth.module");
const core_1 = require("@nestjs/core");
const global_exception_filter_1 = require("./filters/global-exception.filter");
const gateway_module_1 = require("./gateway/gateway.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(no_x_powered_by_middleware_1.NoXPoweredByMiddleware).forRoutes('*');
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
        consumer.apply(secure_header_middleware_1.SecureHeaderMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'dist/public'),
                exclude: [`${constant_1.API_PREFIX_PATH}/(.*)`],
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [{ ttl: constant_1.THROTTLE_TTL, limit: constant_1.THROTTLE_LIMIT }],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            gateway_module_1.GatewayModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_1.GlobalExceptionsFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map