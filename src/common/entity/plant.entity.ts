import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Difficulty, Time } from '../dto/plant.dto';
import { PlantCollectionEntity } from './plant-collection.entity';

@Entity({ name: 'plant' })
export class PlantEntity extends CommonEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  height: number;
  
  @ApiProperty()
  @Column({ default: Difficulty.EASY })
  difficulty: Difficulty;

  @ApiProperty()
  @Column({ nullable: true })
  wateringFrequencySpringToSummerNumber: number;

  @ApiProperty()
  @Column({ nullable: true })
  wateringFrequencyAutumnToWinterNumber: number;

  @ApiProperty()
  @Column({ nullable: true })
  wateringFrequencySpringToSummer: Time;

  @ApiProperty()
  @Column({ nullable: true })
  wateringFrequencyAutumnToWinter: Time;

  @ApiProperty()
  @Column({ nullable: true })
  exposure: string;

  @ApiProperty()
  @Column({ nullable: true })
  humidity: string;

  @ApiProperty()
  @Column({ nullable: true })
  potting: string;

  @ApiProperty()
  @Column({ default: false })
  toxicity: boolean;

  @ApiProperty({ type: () => UserEntity})
  @ManyToOne(() => UserEntity, user => user.plants, { onDelete: 'CASCADE' } )
  owner: UserEntity;

  @ApiProperty()
  @RelationId((plant: PlantEntity) => plant.owner)
  ownerId: number;

  @ApiProperty()
  @OneToMany(
    () => PlantCollectionEntity,
    plantCollection => plantCollection.plant
  )
  users: PlantCollectionEntity[];
}