import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreatePlantDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  humidity: number;
  @ApiProperty()
  @IsString()
  watering: string;
  @ApiProperty()
  @IsNumber()
  difficulty: number;
  @ApiProperty()
  @IsString()
  exposure: string;
  @ApiProperty()
  @IsString()
  toxicity: string;
  @ApiProperty()
  @IsString()
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