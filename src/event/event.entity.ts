/**
 * @author ddaninthe
 */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CommonEntity } from "../common/common.entity";

@Entity()
export class Event extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    enabled: boolean;

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
}
