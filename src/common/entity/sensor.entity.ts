import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "../common.entity";
import { PlantCollectionEntity } from "./plant-collection.entity";

@Entity({ name: 'sensor' })
export class SensorEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => PlantCollectionEntity })
  @OneToOne(() => PlantCollectionEntity)
  @JoinColumn()
  plantCollection: PlantCollectionEntity;

  @ApiProperty()
  @Column()
  humidity: number;
}
