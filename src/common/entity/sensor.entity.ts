import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne, JoinColumn, OneToMany, RelationId } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "../common.entity";
import { PlantCollectionEntity } from "./plant-collection.entity";
import { SensorDataEntity } from "./sensor-data.entity";
import { SensorDto } from "../dto/sensor.dto";

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
  @RelationId((sensor: SensorEntity) => sensor.plantCollection)
  plantCollectionId: number;

  @ApiProperty({ type: () => [SensorDataEntity]})
  @OneToMany(() => SensorDataEntity, sensorData => sensorData.sensor)
  @JoinColumn()
  sensorData: SensorDataEntity[];

  toDto(): SensorDto {
    const dto = new SensorDto();
    dto.id = this.id;
    dto.plantCollectionId = this.plantCollectionId;
    return dto;
  }
}
