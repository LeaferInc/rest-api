import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from 'src/common/entity/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';
import { RoomEntity } from 'src/common/entity/room.entity';
import { ParticipantEntity } from 'src/common/entity/participant.entity';
import { UserModule } from 'src/user/user.module';
import { ParticipantModule } from 'src/participant/participant.module';
import { RoomModule } from 'src/room/room.module';
import { MessageGateway } from './message.gateway';
import { JwtCommonModule } from 'src/jwt-common/jwt-common.module';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationModule } from 'src/notification/notification.module';

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
    JwtCommonModule,
    NotificationModule,
  ],
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
