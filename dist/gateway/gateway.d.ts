import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../modules/auth/auth.service';
export declare class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly authService;
    server: Server;
    constructor(authService: AuthService);
    afterInit(socket: Socket): void;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
}
