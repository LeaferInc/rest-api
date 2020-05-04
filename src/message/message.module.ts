import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from 'src/common/entity/message';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { ParticipantService } from 'src/participant/participant.service';
import { RoomService } from 'src/room/room.service';
import { RoomEntity } from 'src/common/entity/room';
import { ParticipantEntity } from 'src/common/entity/participant';
import { UserModule } from 'src/user/user.module';
import { ParticipantModule } from 'src/participant/participant.module';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      UserEntity,
      RoomEntity,
      ParticipantEntity,
    ]),
    UserModule,
    ParticipantModule,
    RoomModule,
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
