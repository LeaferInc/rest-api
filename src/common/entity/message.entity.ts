import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';
import { RoomEntity } from './room.entity';

@Entity({ name: 'message' })
export class MessageEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  messageContent: string;

  // @ManyToOne(
  //   () => UserEntity,
  //   user => user.messages_sent,
  // )
  // sender: UserEntity;

  // @ManyToOne(
  //   () => UserEntity,
  //   user => user.messages_received,
  // )
  // receiver: UserEntity;

  @ManyToOne(
    () => UserEntity,
    user => user.messages
  )
  user: UserEntity;

  @ManyToOne(
    () => RoomEntity,
    room => room.rooms
  )
  room: RoomEntity;
}
