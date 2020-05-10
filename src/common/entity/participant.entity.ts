import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { RoomEntity } from "./room.entity";

@Entity('participant')
export class ParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => UserEntity,
    user => user.participants
  )
  user: UserEntity;

  @ManyToOne(
    () => RoomEntity,
    room => room.rooms
  )
  room: RoomEntity;
}
