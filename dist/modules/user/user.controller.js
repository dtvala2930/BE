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
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("../../utils/constant");
const user_service_1 = require("./user.service");
const user_list_query_dto_1 = require("./dto/user-list-query.dto");
const lodash_1 = require("lodash");
let UsersController = UsersController_1 = class UsersController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UsersController_1.name);
    }
    async getUsers(queryDTO, res) {
        const resData = {
            statusCode: common_1.HttpStatus.OK,
            success: `get-user-list-success`,
            data: null,
        };
        try {
            const { data, metaData } = await this.userService.getAll(queryDTO);
            (0, lodash_1.assign)(resData, {
                data,
                metaData,
            });
        }
        catch (error) {
            this.logger.log(error);
            throw new common_1.HttpException(error.message, error.status);
        }
        return res.status(common_1.HttpStatus.OK).json(resData);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_list_query_dto_1.UserListQueryDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)(`${constant_1.API_PREFIX_PATH}/users`),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UsersController);
//# sourceMappingURL=user.controller.js.map