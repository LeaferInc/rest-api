import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class ObjectEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    createdAt: Date;
}
