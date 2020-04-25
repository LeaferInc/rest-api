import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'plant' })
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

  @ManyToOne(() => UserEntity, user => user.plants)
  owner: UserEntity;

  @RelationId((plant: PlantEntity) => plant.owner)
  ownerId: number;
}