import { Server, Socket } from 'socket.io';
import { AuthService } from '../modules/auth/auth.service';
import { OnModuleInit } from '@nestjs/common';
interface JwtPayload {
    accountId: number;
    iat?: number;
    exp?: number;
}
export interface socketMetaPayload extends JwtPayload {
    socketId: string;
}
export declare class Gateway implements OnModuleInit {
    private readonly authService;
    server: Server;
    socketMap: Map<string, socketMetaPayload>;
    constructor(authService: AuthService);
    onModuleInit(): void;
    emitNotification(userId: string): Promise<void>;
    currentUsers(client: Socket): Promise<void>;
}
export {};
