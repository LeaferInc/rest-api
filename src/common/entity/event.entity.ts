/**
 * @author ddaninthe
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { CommonEntity } from "../common.entity";
import { UserEntity } from "./user.entity";
import { Exclude } from "class-transformer";

@Entity({ name: 'event' })
export class EventEntity extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({ default: 0 })
    price: number;

    @Column()
    maxPeople: number;

    @Column({ type: 'float8' })
    latitude: number;

    @Column({ type: 'float8' })
    longitude: number;

    @ManyToOne(() => UserEntity, organizer => organizer.events)
    organizer: UserEntity;

    @Exclude()
    @ManyToMany(() => UserEntity, user => user.joinedEvents)
    @JoinTable({ name: 'entry' })
    entrants: UserEntity[];
}
