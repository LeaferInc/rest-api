import { Module } from '@nestjs/common';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantEntity } from 'src/common/entity/participant';
import { UserEntity } from 'src/common/entity/user.entity';
import { RoomEntity } from 'src/common/entity/room';
import { UserModule } from 'src/user/user.module';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParticipantEntity, UserEntity, RoomEntity]),
    UserModule,
    RoomModule
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService],
  exports: [ParticipantService],
})
export class ParticipantModule {}
