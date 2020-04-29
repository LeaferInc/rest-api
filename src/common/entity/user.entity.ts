import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Exclude } from "class-transformer";
import { EventEntity } from './event.entity';
import { CuttingEntity } from './cutting';
import { MessageEntity } from './message';

@Entity({name: 'users'})
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

  @Column({nullable: true})
  firstname: string;

  @Column({nullable: true})
  lastname: string;

  @Column({nullable: true})
  birthdate: Date;

  @Column({nullable: true})
  biography: string;

  @Column({nullable: true})
  location: string;

  @Column({nullable: true, name: 'picture_id'})
  pictureId: number;

  @OneToMany(() => EventEntity, event => event.organizer)
  events: EventEntity[];

  @OneToMany(() => CuttingEntity, cutting => cutting.owner)
  cuttings: CuttingEntity[];

  @OneToMany(() => MessageEntity, message => message.buyer)
  messages: MessageEntity[];

  @ManyToMany(() => CuttingEntity)
  @JoinTable({name: 'users_favorites_cuttings'})
  favoritesCuttings: CuttingEntity[];
}
