import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { ParticipantEntity } from "./participant.entity";
import { MessageEntity } from "./message.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('room')
export class RoomEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: () => [RoomEntity] })
  @OneToMany(
    () => ParticipantEntity,
    participant => participant.room
  )
  rooms: RoomEntity[]

  @ApiProperty({ type: () => [MessageEntity] })
  @OneToMany(
    () => MessageEntity,
    message => message.room
  )
  message: MessageEntity[]
}
