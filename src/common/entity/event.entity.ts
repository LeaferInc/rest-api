/**
 * @author ddaninthe
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { CommonEntity } from "../common.entity";
import { UserEntity } from "./user.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'event' })
export class EventEntity extends CommonEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    location: string;

    @ApiProperty()
    @Column()
    startDate: Date;

    @ApiProperty()
    @Column()
    endDate: Date;

    @ApiProperty()
    @Column({ default: 0 })
    price: number;

    @ApiProperty()
    @Column()
    maxPeople: number;

    @ApiProperty()
    @Column({ type: 'float8' })
    latitude: number;

    @ApiProperty()
    @Column({ type: 'float8' })
    longitude: number;

    @ApiProperty({ type: () => UserEntity })
    @Exclude()
    @ManyToOne(() => UserEntity, organizer => organizer.events, { onDelete: 'CASCADE' })
    organizer: UserEntity;

    @ApiProperty({ type: () => [UserEntity] })
    @Exclude()
    @ManyToMany(() => UserEntity, user => user.joinedEvents)
    @JoinTable({ name: 'entry' })
    entrants: UserEntity[];

    joined?: boolean;
}
