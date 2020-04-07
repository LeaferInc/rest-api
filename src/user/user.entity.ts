import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthDate: Date;

    @Column()
    biography: string;

    @Column()
    location: string;

    @Column()
    pictureId: number;
}
