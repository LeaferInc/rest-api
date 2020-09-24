import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../common.entity";
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
    @Column()
    humidity: number;
}