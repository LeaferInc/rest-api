import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { NotificationEntity } from "./notification.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'notification_message' })
export class NotificationMessageEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  sender: UserEntity;

  @OneToOne(() => NotificationEntity)
  @JoinColumn()
  notification: NotificationEntity;

}
