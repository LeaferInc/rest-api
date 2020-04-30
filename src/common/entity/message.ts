import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'messages' })
export class MessageEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message_content: string;

  @ManyToOne(
    () => UserEntity,
    user => user.messages_sent,
  )
  sender: UserEntity;

  @ManyToOne(
    () => UserEntity,
    user => user.messages_received,
  )
  receiver: UserEntity;
}
