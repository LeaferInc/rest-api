import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { RoomEntity } from "./room.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('participant')
export class ParticipantEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(
    () => UserEntity,
    user => user.participants,
    { onDelete: 'CASCADE' }
  )
  user: UserEntity;

  @ApiProperty({ type: () => RoomEntity })
  @ManyToOne(
    () => RoomEntity,
    room => room.rooms,
    { onDelete: 'CASCADE' }
  )
  room: RoomEntity;
}
