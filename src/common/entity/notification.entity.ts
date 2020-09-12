import { CommonEntity } from "../common.entity";
import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'notification' })
export class NotificationEntity extends CommonEntity {
  
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @ManyToOne(
    () => UserEntity,
    notifier => notifier.notifications
  )
  notifier: UserEntity

  @ApiProperty()
  @Column({default: false})
  read: boolean;
}