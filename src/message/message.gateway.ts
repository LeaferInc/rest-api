import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, UsePipes, ValidationPipe, UseFilters, UseGuards } from '@nestjs/common';
import { RoomService } from 'src/room/room.service';
import { MessageEntity } from 'src/common/entity/message.entity';
import { WsExceptionFilterExtended } from './gateway.filter';
import { JwtService } from '@nestjs/jwt';
import { WsJwtGuard } from './ws-jwt-guard.guard';
import { UserEntity } from 'src/common/entity/user.entity';

@WebSocketGateway({
  namespace: 'chat',
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
})
@UseFilters(WsExceptionFilterExtended)
@UsePipes(new ValidationPipe({transform: true}))
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(MessageGateway.name);

  @WebSocketServer()
  server: Server;

  /**
   * { 1 : 'client session' }
   */
  private userStore: any = {};
  /**
   * { '/chat#UHSn2QLYtOoraSv8AAAD' : 1 }
   */
  private sessionStore: any = {};

  constructor(
    private roomService: RoomService,
    private jwtService: JwtService
  ) {}

  afterInit(server) {
    this.logger.log('Chat Initialized');
  }

  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    //TODO: Add security here ; user header to transfer jwt and get userId

    const token = client.handshake.headers.authorization.split(' ')[1];
    
    if(!token) {
      throw new WsException('Missing jwt token');
    }

    try {
      const decoded = this.jwtService.verify(token);

      this.userStore[decoded.sub] = { clientId: client.id, roomSession: null };
      this.sessionStore[client.id] = decoded.sub;
      this.logger.log(
        `User ${decoded.sub} connected with session ${client.id} `,
      );
      client.emit('init', `User ${this.sessionStore[client.id]} initialized`);
    } catch(err) {
      client.disconnect(true);
      throw new WsException('Forbiden');
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const userId = this.sessionStore[client.id];
    this.logger.log(`User ${userId} disconnected with session ${client.id}`);
    delete this.userStore[userId];
    delete this.sessionStore[client.id];
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody() _roomId: string, @ConnectedSocket() client: Socket) {
    // TODO: Add security
    const roomId = Number(_roomId);
    if(!roomId) throw new WsException('roomId is not a number');
      
    const room = await this.roomService.findOne(roomId);

    if(!room) throw new WsException('Room is not valid');
    
    client.join(String(room.id), (err) => {
      this.logger.log(`Client ${client.id} joining room ${room.id}`);
      client.emit('roomJoined', `Client ${this.sessionStore[client.id]} joined room ${room.id}`);
    });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('leaveRoom')
  async leaveRoom(@MessageBody() _roomId: string, @ConnectedSocket() client: Socket) {
    // TODO: Add security
    const roomId = Number(_roomId);
    if(!roomId) throw new WsException('roomId is not a number');
      
    const room = await this.roomService.findOne(roomId);

    if(!room) throw new WsException('Room is not valid');

    client.leave(String(room.id), (err) => {
      this.logger.log(`Client ${client.id} leaving room ${room.id}`);
      client.emit('roomLeft' , `Client ${this.sessionStore[client.id]} left room ${room.id}`);
    });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('debug')
  async debug(@MessageBody() _roomId: string, @ConnectedSocket() client: Socket) {
    return { connected: client.connected, rooms: client.adapter.rooms }
  }

  /**
   * Fonction used by MessageService to send a message to the socketio pipeline
   * The responsability to send a message to socketio pipeline is not from the client (user) 
   * but from our backend
   * @param message 
   */
  async addMessageExternal(message: MessageEntity) {
    // Message
    this.logger.log(`Client ${message.user.username} make a message with content '${message.messageContent}' in room ${message.room.id}`);
    this.server.to(String(message.room.id)).emit('messageServerToClient', message);
  }

  async newDiscussion(sender: UserEntity, receiver: UserEntity, roomId: number) {
    this.logger.log(`New discussion created by ${sender.username} with ${receiver.username}`);
    this.server.to(String(this.userStore[receiver.id].clientId)).emit('newDiscussion', Object.assign(sender, { roomId: roomId }));
  }
}
