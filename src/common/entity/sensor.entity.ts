import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "../common.entity";
import { PlantCollectionEntity } from "./plant-collection.entity";
import { SensorDataEntity } from "./sensor-data.entity";

@Entity({ name: 'sensor' })
export class SensorEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => PlantCollectionEntity })
  @OneToOne(() => PlantCollectionEntity)
  @JoinColumn()
  plantCollection: PlantCollectionEntity;

  @ApiProperty({ type: () => [SensorDataEntity]})
  @OneToMany(() => SensorDataEntity, sensorData => sensorData.sensor)
  @JoinColumn()
  sensorData: SensorDataEntity[];

}
