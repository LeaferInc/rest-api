import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, Column } from "typeorm";
import { UserEntity } from "./user.entity";
import { ParticipantEntity } from "./participant";
import { MessageEntity } from "./message";

@Entity('rooms')
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
