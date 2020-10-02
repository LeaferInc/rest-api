import { CommonEntity } from "../common.entity";
import { ManyToOne, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { PlantEntity } from "./plant.entity";
import { SensorEntity } from "./sensor.entity";
import { PlantCollectionDto } from "../dto/plant-collection.dto";

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
  user: UserEntity;

  @ApiProperty()
  @RelationId((plantCollection: PlantCollectionEntity) => plantCollection.user)
  userId: number;

  @ApiProperty()
  @ManyToOne(
    () => PlantEntity,
    plant => plant.users,
    { onDelete: 'CASCADE' }
  )
  plant: PlantEntity

  @ApiProperty()
  @RelationId((plantCollection: PlantCollectionEntity) => plantCollection.plant)
  plantId: number;

  @ApiProperty()
  @OneToOne(() => SensorEntity, sensor => sensor.plantCollection)
  sensor: SensorEntity;

  toDto(): PlantCollectionDto{
    const dto = new PlantCollectionDto();
    dto.id = this.id;
    dto.plantId = this.plantId;
    dto.userId = this.plantId;
    return dto;
  }
}
