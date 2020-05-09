import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { ParticipantEntity } from "./participant.entity";
import { MessageEntity } from "./message.entity";

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => ParticipantEntity,
    participant => participant.room
  )
  rooms: RoomEntity[]

  @OneToMany(
    () => MessageEntity,
    message => message.room
  )
  message: MessageEntity[]
}
