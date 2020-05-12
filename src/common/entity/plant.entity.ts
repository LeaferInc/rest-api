import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'plant' })
export class PlantEntity extends CommonEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: true })
  enabled: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @ApiProperty()
  @Column()
  humidity: number;

  @ApiProperty()
  @Column()
  watering: string;

  @ApiProperty()
  @Column()
  difficulty: number;

  @ApiProperty()
  @Column()
  exposure: string;

  @ApiProperty()
  @Column()
  toxicity: string;

  @ApiProperty()
  @Column()
  potting: string;

  @ApiProperty()
  @Column()
  createdAt: Date;

  @ApiProperty({ type: () => UserEntity})
  @ManyToOne(() => UserEntity, user => user.plants)
  owner: UserEntity;

  @ApiProperty()
  @RelationId((plant: PlantEntity) => plant.owner)
  ownerId: number;
}