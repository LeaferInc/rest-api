import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { ParticipantEntity } from 'src/common/entity/participant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from 'src/common/entity/room';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
