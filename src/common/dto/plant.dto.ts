import { UserEntity } from "../entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlantDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  humidity: number;
  @ApiProperty()
  watering: string;
  @ApiProperty()
  difficulty: number;
  @ApiProperty()
  exposure: string;
  @ApiProperty()
  toxicity: string;
  @ApiProperty()
  potting: string;

  constructor(plant?: CreatePlantDto) {
  }
}

export class PlantDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  humidity: number;
  @ApiProperty()
  watering: string;
  @ApiProperty()
  difficulty: number;
  @ApiProperty()
  exposure: string;
  @ApiProperty()
  toxicity: string;
  @ApiProperty()
  potting: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  owner: number;
}