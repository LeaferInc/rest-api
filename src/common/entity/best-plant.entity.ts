import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../common.entity";
import { BestPlantDto } from "../dto/best-plant.dto";
import { ImageService, ImageType } from "src/image/image.service";

export enum PlantLuminosity {
  EXPOSED = "exposition au Soleil",
  UNEXPOSED = "lumière sans exposition directe",
  SHADOW = "peu de lumière",
}

export enum PlantHeight {
  SMALL = "petite",
  MEDIUM = "moyenne",
  TALL = "grande",
}

export enum PlantCareTime {
  BIT = 'quasiment pas',
  LITTLE = 'assez peu',
  MEDIUM = 'moyen',
  LOT = 'beaucoup',
}

@Entity({ name: 'best_plant' })
export class BestPlantEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  careTime: PlantCareTime;

  @Column()
  luminosity: PlantLuminosity;

  @Column()
  height: PlantHeight;

  @Column()
  potting: number; // Per year

  @Column()
  humidity: number;

  @Column()
  toxicity: boolean;

  @Column()
  price: number;

  @Column()
  pictureId: string;

  score?: number;

  constructor(name: string, height: PlantHeight, careTime: PlantCareTime, luminosity: PlantLuminosity,
    potting: number, humidity: number, toxicity: boolean, price: number, picture: string) {
    super();
    this.name = name;
    this.height = height;
    this.luminosity = luminosity;
    this.potting = potting;
    this.humidity = humidity;
    this.careTime = careTime;
    this.toxicity = toxicity;
    this.price = price;
    this.pictureId = picture;
  }

  toDto(): BestPlantDto {
    const dto = new BestPlantDto();
    dto.name = this.name;
    dto.height = this.height;
    dto.price = this.price;
    dto.potting = this.potting;
    dto.luminosity = this.luminosity;
    dto.toxicity = this.toxicity;
    dto.picture = ImageService.readFile(ImageType.BEST_PLANT, this.pictureId);
    return dto;
  }
}

/**
 * List of all plants that could be suggested to a user
 */
export class BestPlantList {
  static PLANTS: BestPlantEntity[] = [
    new BestPlantEntity('Ficus microcarpa', PlantHeight.MEDIUM, PlantCareTime.LITTLE, PlantLuminosity.UNEXPOSED, 2, 50, true, 30, 'ficus-microcarpa.jpg'),
    new BestPlantEntity('Monstera deliciosia', PlantHeight.TALL, PlantCareTime.MEDIUM, PlantLuminosity.UNEXPOSED, 2, 55, true, 40, 'monstera-deliciosia.jpg'),
    new BestPlantEntity('Sansevieria trifasciata', PlantHeight.MEDIUM, PlantCareTime.BIT, PlantLuminosity.UNEXPOSED, 2, 25, true, 10, 'sansevieria-trifasciata.jpg'),
    new BestPlantEntity('Yucca elephantipes', PlantHeight.TALL, PlantCareTime.MEDIUM, PlantLuminosity.UNEXPOSED, 2, 50, true, 50, 'yucca-elephantipes.jpg'),
    new BestPlantEntity('Zamioculcas zamiifolia', PlantHeight.MEDIUM, PlantCareTime.LITTLE, PlantLuminosity.SHADOW, 2, 50, true, 20, 'zamioculcas-zamiifolia.jpg'),
  ];
}