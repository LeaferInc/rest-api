import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, OneToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Difficulty, Time, PlantDto } from '../dto/plant.dto';
import { PlantCollectionEntity } from './plant-collection.entity';
import { ImageService, ImageType } from 'src/image/image.service';

@Entity({ name: 'plant' })
export class PlantEntity extends CommonEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  height: number;

  @ApiProperty()
  @Column({ default: Difficulty.EASY })
  difficulty: Difficulty;

  @ApiProperty()
  @Column({ nullable: true })
  wateringFrequencySpringToSummerNumber: number;

  @ApiProperty()
  @Column({ nullable: true })
  wateringFrequencyAutumnToWinterNumber: number;

  @ApiProperty()
  @Column({ nullable: true })
  wateringFrequencySpringToSummer: Time;

  @ApiProperty()
  @Column({ nullable: true })
  wateringFrequencyAutumnToWinter: Time;

  @ApiProperty()
  @Column({ nullable: true })
  exposure: string;

  @ApiProperty()
  @Column({ nullable: true })
  humidityMin: number;

  @ApiProperty()
  @Column({ nullable: true })
  humidityMax: number;

  @ApiProperty()
  @Column({ nullable: true })
  potting: string;

  @ApiProperty()
  @Column({ default: false })
  toxicity: boolean;

  @ApiProperty({ type: () => UserEntity})
  @ManyToOne(() => UserEntity, user => user.plants, { onDelete: 'CASCADE' } )
  owner: UserEntity;

  @ApiProperty()
  @RelationId((plant: PlantEntity) => plant.owner)
  ownerId: number;

  @ApiProperty()
  @OneToMany(
    () => PlantCollectionEntity,
    plantCollection => plantCollection.plant
  )
  users: PlantCollectionEntity[];

  @ApiProperty()
  @Column({ nullable: true })
  pictureId: string;

  toDto(): PlantDto {
    const dto = new PlantDto();
    dto.id = this.id;
    dto.name = this.name;
    dto.humidityMin = this.humidityMin;
    dto.humidityMax = this.humidityMax;
    dto.height = this.height;
    dto.difficulty = this.difficulty;
    dto.toxicity = this.toxicity;
    dto.potting = this.potting;
    dto.owner = this.ownerId;
    dto.exposure = this.exposure;
    dto.wateringFrequencyAutumnToWinter = this.wateringFrequencyAutumnToWinter;
    dto.wateringFrequencyAutumnToWinterNumber = this.wateringFrequencyAutumnToWinterNumber;
    dto.wateringFrequencySpringToSummer = this.wateringFrequencySpringToSummer;
    dto.wateringFrequencySpringToSummerNumber = this.wateringFrequencySpringToSummerNumber;
    dto.picture = ImageService.readFile(ImageType.PLANT, this.pictureId);
    return dto;
  }
}