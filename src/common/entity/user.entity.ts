import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Exclude } from "class-transformer";
import { EventEntity } from './event.entity';

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  enabled: boolean;

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

  @OneToMany(() => EventEntity, event => event.organizer)
  events: EventEntity[];

  @Exclude()
  @ManyToMany(() => EventEntity, event => event.entrants)
  @JoinTable({ name: 'entry' })
  joinedEvents: EventEntity[];
}
