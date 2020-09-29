import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { NotificationEntity } from "./notification.entity";
import { SensorEntity } from "./sensor.entity";

@Entity({ name: 'notification_alert' })
export class NotificationAlertEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => SensorEntity)
  @JoinColumn()
  sensor: SensorEntity;

  @OneToOne(() => NotificationEntity)
  @JoinColumn()
  notification: NotificationEntity;

}