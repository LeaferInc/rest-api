import { UserEntity } from "../entity/user.entity";

export class CreatePlantDto {
  name: string;
  humidity: number;
  watering: string;
  difficulty: number;
  exposure: string;
  toxicity: string;
  potting: string;
  userId: number;

  constructor(plant?: CreatePlantDto) {
  }
}

export class PlantDto {
  id: number;
  name: string;
  humidity: number;
  watering: string;
  difficulty: number;
  exposure: string;
  toxicity: string;
  potting: string;
  createdAt: Date;
  userId: number;
}