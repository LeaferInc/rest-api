import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: new Date()})
    createdAt: Date;

    @Column({default: true})
    enabled: boolean;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({nullable: true})
    birthdate: Date;

    @Column({nullable: true})
    biography: string;

    @Column({nullable: true})
    location: string;

    @Column({nullable: true})
    pictureId: number;
}
