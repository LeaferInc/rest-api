import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'cutting' })
export class CuttingEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  tradeWith: string;

  @Column({ default: 0 })
  viewsCount: number;

  @ManyToOne(
    () => UserEntity,
    owner => owner.cuttings,
  )
  owner: UserEntity;

  @RelationId((cutting: CuttingEntity) => cutting.owner)
  ownerId: number;
}
