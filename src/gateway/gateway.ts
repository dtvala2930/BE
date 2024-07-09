import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../modules/auth/auth.service';

@WebSocketGateway()
export class Gateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(private readonly authService: AuthService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(socket: Socket) {}

  handleConnection(socket: Socket) {
    console.log(socket.id);
    const authHeader = socket.handshake.headers.authorization;
    if (authHeader && (authHeader as string).split(' ')[1]) {
      try {
        const id = this.authService.hanldeVerifyToken(
          (authHeader as string).split(' ')[1],
        );
        socket.data.id = id;
      } catch (error) {
        socket.disconnect();
      }
    } else {
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    console.log(socket.id, socket.data?.id);
  }
}
