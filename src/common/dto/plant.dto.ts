import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean } from "class-validator";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum Time {
  HOUR = "hour",
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
}

export class CreatePlantDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  wateringFrequencySpringToSummerNumber: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  wateringFrequencyAutumnToWinterNumber: number;

  @ApiProperty()
  @IsEnum(Time)
  @IsOptional()
  wateringFrequencySpringToSummer: Time;

  @ApiProperty()
  @IsEnum(Time)
  @IsOptional()
  wateringFrequencyAutumnToWinter: Time;

  @ApiProperty()
  @IsString()
  @IsOptional()
  exposure: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  humidity: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  potting: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  toxicity: boolean;

  constructor(plant?: CreatePlantDto) {
  }

}

// export class PlantDto {
//   @ApiProperty()
//   id: number;
//   @ApiProperty()
//   name: string;
//   @ApiProperty()
//   humidity: number;
//   @ApiProperty()
//   watering: string;
//   @ApiProperty()
//   difficulty: number;
//   @ApiProperty()
//   exposure: string;
//   @ApiProperty()
//   toxicity: string;
//   @ApiProperty()
//   potting: string;
//   @ApiProperty()
//   createdAt: Date;
//   @ApiProperty()
//   owner: number;
// }