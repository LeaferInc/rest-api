import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { SensorDataEntity } from 'src/common/entity/sensor-data.entity';
import { PlantCollectionService } from 'src/plant-collection/plant-collection.service';
import { UserService } from 'src/user/user.service';

function getKey(map: Map<number, string>, val: string) {
  return [...map.entries()]
    .filter(({ 1: v }) => v === val)
    .map(([k]) => k);
}

@WebSocketGateway({
  namespace: 'sensor',
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
export class SensorDataGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private readonly logger = new Logger(SensorDataGateway.name);

  @WebSocketServer()
  server: Server;

  private userStore = new Map<number, string>();

  constructor(
    private jwtService: JwtService,
    private plantCollectionService: PlantCollectionService,
    private userService: UserService,
  ) {}

  afterInit(server: any) {
    this.logger.log('SensorGateway initialized');
  }

  handleConnection(@ConnectedSocket() client: any, ...args: any[]) {
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
      client.disconnect();
      throw new WsException('Forbiden');
    }
  }

  handleDisconnect(client: any) {
    const userId = Number(getKey(this.userStore, client.id));
    this.logger.log(`User ${userId} disconnected with session ${client.id}`);
    this.userStore.delete(userId);
  }

  async sendSensorData(data: SensorDataEntity) {
    this.logger.log(
      `Send sensor data with : ground humidity ${data.groundHumidity} - air humidity ${data.airHumidity} - temperature ${data.temperature}`
    );
    const plantCollectionEntity = await this.plantCollectionService.findById(data.sensor.plantCollectionId);
    const userEntity = await this.userService.findOneById(plantCollectionEntity.userId);
    this.server.to(String(this.userStore.get(userEntity.id))).emit('newSensorData', data);
  }
}
