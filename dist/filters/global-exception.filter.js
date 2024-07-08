"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let GlobalExceptionsFilter = class GlobalExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        console.error(exception);
        if (exception instanceof common_1.HttpException) {
            statusCode = exception.getStatus();
            message = exception.message;
        }
        response.status(statusCode).json({
            statusCode: statusCode,
            message: message,
        });
    }
};
exports.GlobalExceptionsFilter = GlobalExceptionsFilter;
exports.GlobalExceptionsFilter = GlobalExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionsFilter);
//# sourceMappingURL=global-exception.filter.js.map