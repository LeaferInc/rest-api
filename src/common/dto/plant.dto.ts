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
  humidity: string;
  potting: string;
  toxicity: boolean;
  owner: number;
  picture: string;
}