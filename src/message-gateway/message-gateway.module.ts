import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageModule } from 'src/message/message.module';
import { ParticipantModule } from 'src/participant/participant.module';
import { RoomModule } from 'src/room/room.module';
import { MessageService } from 'src/message/message.service';
import { ParticipantService } from 'src/participant/participant.service';
import { RoomService } from 'src/room/room.service';

@Module({
  imports: [
    MessageModule,
    ParticipantModule,
    RoomModule
  ],
  providers: [
    MessageGateway
  ],
})
export class MessageGatewayModule {}

