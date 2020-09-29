import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { CommonEntity } from "../common.entity";
import { SensorDataDto } from "../dto/sensor-data.dto";
import { SensorEntity } from "./sensor.entity";

@Entity({name: 'sensor_data'})
export class SensorDataEntity extends CommonEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => SensorEntity})
    @ManyToOne(() => SensorEntity, sensor => sensor.sensorData, { onDelete: 'CASCADE'})
    sensor: SensorEntity;

    @ApiProperty()
    @RelationId((sensorData: SensorDataEntity) => sensorData.sensor)
    sensorId: number;

    @ApiProperty()
    @Column()
    humidity: number;

    toDto(): SensorDataDto {
        const dto = new SensorDataDto();
        dto.id = this.id;
        dto.createAt = this.createdAt;
        dto.humidity = this.humidity;
        dto.sensorId = this.sensorId;
        return dto;
    }
}