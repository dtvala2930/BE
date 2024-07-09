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
    }
    afterInit(socket) { }
    handleConnection(socket) {
        console.log(socket.id);
        const authHeader = socket.handshake.headers.authorization;
        if (authHeader && authHeader.split(' ')[1]) {
            try {
                const id = this.authService.hanldeVerifyToken(authHeader.split(' ')[1]);
                socket.data.id = id;
            }
            catch (error) {
                socket.disconnect();
            }
        }
        else {
            socket.disconnect();
        }
    }
    handleDisconnect(socket) {
        console.log(socket.id, socket.data?.id);
    }
};
exports.Gateway = Gateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], Gateway.prototype, "server", void 0);
exports.Gateway = Gateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], Gateway);
//# sourceMappingURL=gateway.js.map