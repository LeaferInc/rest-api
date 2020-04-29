import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';
import { CuttingEntity } from './cutting';

@Entity({ name: 'messages' })
export class MessageEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message_content: string;

  @ManyToOne(() => UserEntity, buyer => buyer.messages)
  buyer: UserEntity;

  @ManyToOne(() => CuttingEntity, cutting => cutting.messages)
  cutting: CuttingEntity;
}
