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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const query_data_and_meta_1 = require("../../utils/interfaces/query-data-and-meta");
const prisma_service_1 = require("../../prisma.service");
const client_1 = require("@prisma/client");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll(queryParams) {
        const { limit, page } = queryParams;
        const skip = page > 1 ? (page - 1) * limit : 0;
        const users = await this.prismaService.user.findMany({
            take: limit,
            skip,
        });
        const total = await this.prismaService.user.count();
        return new query_data_and_meta_1.QueryDataAndMeta({
            data: users,
            total: total,
            queryParams,
        });
    }
    async getUserByField({ id, email, refresh_token, }) {
        const user = await this.prismaService.user.findFirst({
            where: { OR: [{ id }, { email }, { refresh_token }] },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User not found.`);
        }
        return user;
    }
    async updateUser(id, updateData) {
        try {
            const updatedUser = await this.prismaService.user.update({
                where: {
                    id,
                },
                data: updateData,
            });
            return updatedUser;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`User with ID ${id} not found.`);
                }
            }
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map