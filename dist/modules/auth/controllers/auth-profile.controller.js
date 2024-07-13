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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProfileController = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const passport_1 = require("@nestjs/passport");
const guards_1 = require("../guards");
const constant_1 = require("../../../utils/constant");
let AuthProfileController = class AuthProfileController {
    constructor() { }
    async profile(req, res) {
        const httpStatusCode = common_1.HttpStatus.OK;
        const resData = {
            statusCode: httpStatusCode,
            success: 'get-profile-success',
            data: null,
        };
        try {
            const { user } = req;
            const userCurrent = user;
            (0, lodash_1.assign)(resData, {
                data: {
                    ...userCurrent,
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return res.status(httpStatusCode).json(resData);
    }
};
exports.AuthProfileController = AuthProfileController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthProfileController.prototype, "profile", null);
exports.AuthProfileController = AuthProfileController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), guards_1.ServiceGuard),
    (0, common_1.Controller)(`${constant_1.API_PREFIX_PATH}/auth`),
    __metadata("design:paramtypes", [])
], AuthProfileController);
//# sourceMappingURL=auth-profile.controller.js.map