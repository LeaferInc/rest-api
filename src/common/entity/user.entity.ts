import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Exclude } from "class-transformer";
import { PlantEntity } from './plant.entity';

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

  @OneToMany(() => PlantEntity, plant => plant.owner)
  plants: PlantEntity[];
}
