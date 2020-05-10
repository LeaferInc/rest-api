import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity } from '../common.entity';
import { EventEntity } from './event.entity';
import { CuttingEntity } from './cutting.entity';
import { MessageEntity } from './message.entity';
import { ParticipantEntity } from './participant.entity';

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  biography: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  pictureId: number;

  @OneToMany(
    () => EventEntity,
    event => event.organizer,
  )
  events: EventEntity[];

  @OneToMany(
    () => CuttingEntity,
    cutting => cutting.owner,
  )
  cuttings: CuttingEntity[];

  // @OneToMany(
  //   () => MessageEntity,
  //   message => message.sender,
  // )
  // messages_sent: MessageEntity[];

  // @OneToMany(
  //   () => MessageEntity,
  //   message => message.receiver,
  // )
  // messages_received: MessageEntity[];

  @OneToMany(
    () => MessageEntity,
    message => message.user
  )
  messages: MessageEntity[];

  @ManyToMany(() => CuttingEntity)
  @JoinTable({ name: 'user_favorite_cutting' })
  favoritesCuttings: CuttingEntity[];

  @OneToMany(
    () => ParticipantEntity,
    participant => participant.user
  )
  participants: ParticipantEntity[];

  @Exclude()
  @ManyToMany(() => EventEntity, event => event.entrants)
  joinedEvents: EventEntity[];
}
