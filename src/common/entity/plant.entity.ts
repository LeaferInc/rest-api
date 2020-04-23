import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Exclude } from "class-transformer";
import { UserEntity } from './user.entity';

@Entity()
export class PlantEntity extends CommonEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  enabled: boolean;

  @Column({ nullable: true })
  name: string;

  @Column()
  humidity: number;

  @Column()
  watering: string;

  @Column()
  difficulty: number;

  @Column()
  exposure: string;

  @Column()
  toxicity: string;

  @Column()
  potting: string;

  @Column()
  createdAt: Date;

  @OneToOne(type => UserEntity)
  @JoinColumn()
  user: UserEntity;

}