import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
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

@WebSocketGateway()
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  socketMap = new Map<string, socketMetaPayload>();

  constructor(private readonly authService: AuthService) {}

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

  async emitNotification(userId: string) {
    const socketMeta = this.socketMap.get(userId);
    // const notif = await this.notificationService.create(notification);
    if (socketMeta) {
      this.server.to(socketMeta?.socketId).emit('notification', 'heheheheh');
    } else {
      console.log('user is not online at the moment!');
    }
  }

  @SubscribeMessage('currentUsers')
  async currentUsers(client: Socket) {
    client.emit('currentUsers', Array.from(this.socketMap.values()));
  }
}
