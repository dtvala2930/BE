"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceGuard = void 0;
const common_1 = require("@nestjs/common");
let ServiceGuard = class ServiceGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const account = request.user;
        if (account) {
            return true;
        }
        throw new common_1.UnauthorizedException('unauthorized-access');
    }
};
exports.ServiceGuard = ServiceGuard;
exports.ServiceGuard = ServiceGuard = __decorate([
    (0, common_1.Injectable)()
], ServiceGuard);
//# sourceMappingURL=guards.service.js.map