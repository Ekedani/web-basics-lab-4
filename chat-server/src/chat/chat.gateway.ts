import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    client.data.username = client.handshake.query.username;
    this.server.emit('users-changed', {
      user: {
        username: client.data.username,
        id: client.id,
      },
      type: 'connected',
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, content: string): void {
    this.server.emit('message', {
      user: {
        username: client.data.username,
        id: client.id,
      },
      content: content,
      timestamp: new Date(),
    });
  }

  handleDisconnect(client: Socket): void {
    console.log('client disconnected');
    this.server.emit('users-changed', {
      user: {
        username: client.data.username,
        id: client.id,
      },
      type: 'left',
      timestamp: new Date(),
    });
  }
}
