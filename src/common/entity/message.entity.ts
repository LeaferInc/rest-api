import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';
import { RoomEntity } from './room.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'message' })
export class MessageEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
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

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(
    () => UserEntity,
    user => user.messages,
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
