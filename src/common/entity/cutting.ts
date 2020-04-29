import { CommonEntity } from "../common.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { MessageEntity } from "./message";

@Entity({name: 'cuttings'})
export class CuttingEntity extends CommonEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({nullable: true})
  tradeWith: string;

  @Column({default: 0})
  viewsCount: number

  @ManyToOne(() => UserEntity, owner => owner.cuttings)
  owner: UserEntity;

  @RelationId((cutting: CuttingEntity) => cutting.owner)
  ownerId: number;

  @OneToMany(() => MessageEntity, message => message.cutting)
  messages: MessageEntity[];
}
