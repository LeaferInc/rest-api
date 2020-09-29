import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean, IsBase64 } from "class-validator";

export enum Difficulty {
  EASY = "facile",
  MEDIUM = "moyen",
  HARD = "difficile",
}

export enum Time {
  HOUR = "heure",
  DAY = "jour",
  WEEK = "semaine",
  MONTH = "mois",
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
  @IsNumber()
  @IsOptional()
  humidityMin: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  humidityMax: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  potting: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  toxicity: boolean;

  @ApiProperty()
  @IsBase64()
  picture: string;
}

export class PlantDto {
  id: number;
  name: string;
  height: number;
  difficulty: Difficulty;
  wateringFrequencySpringToSummerNumber: number;
  wateringFrequencyAutumnToWinterNumber: number;
  wateringFrequencySpringToSummer: Time;
  wateringFrequencyAutumnToWinter: Time;
  exposure: string;
  humidityMin: number;
  humidityMax: number;
  potting: string;
  toxicity: boolean;
  owner: number;
  picture: string;
}