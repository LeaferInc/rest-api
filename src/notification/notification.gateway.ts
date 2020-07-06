import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { UseFilters, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { WsExceptionFilterExtended } from 'src/message/gateway.filter';
import { NotificationEntity } from 'src/common/entity/notification.entity';
import { JwtService } from '@nestjs/jwt';
import { Server } from 'socket.io';

function getKey(map, val) {
  return Object.keys(map).find(key => map[key] === val);
}

@WebSocketGateway({
  namespace: 'notification',
  handlePreflightRequest: (req, res) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': req.headers.origin, //or the specific origin you want to give access to,
      'Access-Control-Allow-Credentials': true,
    };
    res.writeHead(200, headers);
    res.end();
  },
})
@UseFilters(WsExceptionFilterExtended)
@UsePipes(new ValidationPipe({ transform: true }))
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(NotificationGateway.name);

  @WebSocketServer()
  server: Server;

  private userStore = new Map<number, string>();

  constructor(
    private jwtService: JwtService
  ) {}

  afterInit(server: any) {
    this.logger.log('Notification initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    const token = client.handshake.headers?.authorization?.split(' ')[1];
    
    if(!token) {
      throw new WsException('Missing jwt token');
    }

    try {
      const decoded = this.jwtService.verify(token);
      this.userStore.set(Number(decoded.sub), String(client.id));
      this.logger.log(
        `User ${decoded.sub} connected with session ${client.id} `,
      );
      client.emit('init', `User ${decoded.sub} initialized`);
    } catch(err) {
      client.disconnect(true);
      throw new WsException('Forbiden');
    }
  }

  handleDisconnect(client: any) {
    const userId = Number(getKey(this.userStore, client.id));
    this.logger.log(`User ${userId} disconnected with session ${client.id}`);
    this.userStore.delete(userId);
  }

  async sendNotificaitons(notification: NotificationEntity) {
    this.logger.log(`Notification sent to ${notification.notifier.username} with content ${notification.content}`);
    this.server.to(String(this.userStore.get(notification.notifier.id))).emit('onNotification', notification);
  }
}
