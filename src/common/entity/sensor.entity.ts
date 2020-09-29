import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, RelationId } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "../common.entity";
import { PlantCollectionEntity } from "./plant-collection.entity";
import { SensorDataEntity } from "./sensor-data.entity";
import { SensorDto } from "../dto/sensor.dto";
import { NotificationAlertEntity } from "./notification-alert.entity";

@Entity({ name: 'sensor' })
export class SensorEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => PlantCollectionEntity })
  @OneToOne(() => PlantCollectionEntity, plantCollection => plantCollection.sensor)
  @JoinColumn()
  plantCollection: PlantCollectionEntity;

  @ApiProperty()
  @RelationId((sensor: SensorEntity) => sensor.plantCollection)
  plantCollectionId: number;

  @ApiProperty({ type: () => [SensorDataEntity]})
  @OneToMany(() => SensorDataEntity, sensorData => sensorData.sensor)
  @JoinColumn()
  sensorData: SensorDataEntity[];

  @OneToOne(() => NotificationAlertEntity)
  notificationAlert: NotificationAlertEntity;

  toDto(): SensorDto {
    const dto = new SensorDto();
    dto.id = this.id;
    dto.plantCollectionId = this.plantCollectionId;
    return dto;
  }
}
