import { CommonEntity } from "../common.entity";
import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

export enum TypeNotification {
  NEW_CONVERSATION
}

@Entity({ name: 'notification' })
export class NotificationEntity extends CommonEntity {
  
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  type: TypeNotification

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column({ nullable: true })
  href: string;

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