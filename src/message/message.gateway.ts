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
import { Logger, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { RoomService } from 'src/room/room.service';
import { MessageEntity } from 'src/common/entity/message.entity';
import { WsExceptionFilterExtended } from './gateway.filter';

@WebSocketGateway({namespace: 'chat'})
@UseFilters(new WsExceptionFilterExtended())
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
    private roomService: RoomService
  ) {}

  afterInit(server) {
    this.logger.log('Chat Initialized');
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    //TODO: Add security here ; user header to transfer jwt and get userId
    this.userStore[client.handshake.query['userId']] = { clientId: client.id, roomSession: null };
    this.sessionStore[client.id] = client.handshake.query['userId'];
    this.logger.log(
      `User ${client.handshake.query['userId']} connected with session ${client.id} `,
    );
    client.emit('init', `User ${this.sessionStore[client.id]} initialized`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const userId = this.sessionStore[client.id];
    this.logger.log(`User ${userId} disconnected with session ${client.id}`);
    delete this.userStore[userId];
    delete this.sessionStore[client.id];
  }

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
}
