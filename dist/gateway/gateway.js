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
exports.Gateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../modules/auth/auth.service");
let Gateway = class Gateway {
    constructor(authService) {
        this.authService = authService;
        this.socketMap = new Map();
    }
    onModuleInit() {
        this.server.on('connection', async (socket) => {
            const token = socket.handshake.headers.authorization?.split(' ')[1];
            if (!token) {
                socket.disconnect(true);
                return;
            }
            const payload = await this.authService.hanldeVerifyToken(token);
            if (!payload) {
                socket.disconnect(true);
                return;
            }
            this.socketMap.set(payload.accountId, {
                ...payload,
                socketId: socket.id,
            });
            socket.on('disconnect', () => {
                this.socketMap.delete(socket.id);
            });
        });
    }
    async emitNotification(userId) {
        const socketMeta = this.socketMap.get(userId);
        if (socketMeta) {
            this.server.to(socketMeta?.socketId).emit('notification', 'heheheheh');
        }
        else {
            console.log('user is not online at the moment!');
        }
    }
    async currentUsers(client) {
        client.emit('currentUsers', Array.from(this.socketMap.values()));
    }
};
exports.Gateway = Gateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], Gateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('currentUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "currentUsers", null);
exports.Gateway = Gateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], Gateway);
//# sourceMappingURL=gateway.js.map