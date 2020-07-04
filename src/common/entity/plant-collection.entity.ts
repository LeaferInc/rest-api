import { CommonEntity } from "../common.entity";
import { ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { PlantEntity } from "./plant.entity";

@Entity({ name: 'plant_collection' })
export class PlantCollectionEntity extends CommonEntity {
  
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(
    () => UserEntity,
    user => user.plantCollection,
    { onDelete: 'CASCADE' }
  )
  user: UserEntity

  @ApiProperty()
  @ManyToOne(
    () => PlantEntity,
    plant => plant.users,
    { onDelete: 'CASCADE' }
  )
  plant: PlantEntity
}
