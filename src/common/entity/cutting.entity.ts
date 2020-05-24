import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'cutting' })
export class CuttingEntity extends CommonEntity {
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
  @Column({ nullable: true })
  tradeWith: string;

  @ApiProperty()
  @Column({ default: 0 })
  viewsCount: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(
    () => UserEntity,
    owner => owner.cuttings,
  )
  owner: UserEntity;

  @ApiProperty()
  @RelationId((cutting: CuttingEntity) => cutting.owner)
  ownerId: number;
}
