/**
 * @author ddaninthe
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CommonEntity } from "../common.entity";
import { UserEntity } from "./user.entity";

@Entity({name: 'event'})
export class EventEntity extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column({ name: 'start_date' })
    startDate: Date;

    @Column({ name: 'end_date' })
    endDate: Date;

    @Column({ default: 0 })
    price: number;

    @Column({ name: 'max_people' })
    maxPeople: number;

    @Column({ type: 'float8' })
    latitude: number;

    @Column({ type: 'float8' })
    longitude: number;

    @ManyToOne(() => UserEntity, organizer => organizer.events)
    organizer: UserEntity;
}
