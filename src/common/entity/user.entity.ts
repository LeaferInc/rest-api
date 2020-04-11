import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CommonEntity } from '../common.entity';

@Entity()
export class UserEntity extends CommonEntity {

  @PrimaryGeneratedColumn()
  id: number;

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
