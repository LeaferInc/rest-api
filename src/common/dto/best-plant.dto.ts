/**
 * @author ddaninthe
 */

import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsBase64, IsNumber, IsNotEmpty, IsEnum } from "class-validator";
import { PlantHeight, PlantLuminosity, PlantCareTime } from "../entity/best-plant.entity";

export class BestPlantDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEnum(PlantHeight)
    height: PlantHeight;

    @ApiProperty()
    @IsEnum(PlantLuminosity)
    luminosity: PlantLuminosity;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsEnum(PlantCareTime)
    careTime: PlantCareTime;

    @ApiProperty()
    @IsNumber()
    potting: number;

    @ApiProperty()
    @IsBoolean()
    toxicity: boolean;

    @ApiProperty()
    @IsBase64()
    picture: string;
}

export enum UserLuminosity {
    SUN = 'ensoleillé',
    CLOUD = 'nuageux',
    RAIN = 'pluvieux',
}

export enum UserCareTime {
    LITTLE = 'très peu',
    MEDIUM = 'suffisamment',
    LOT = 'beaucoup',
}

/**
 * Form sent by user to determines the best plant for him
 */
export class FindBestPlantDto {
    @ApiProperty()
    @IsEnum(UserCareTime)
    careTime: UserCareTime;

    @ApiProperty()
    @IsEnum(UserLuminosity)
    weather: UserLuminosity;

    @ApiProperty()
    @IsBoolean()
    space: boolean;

    @ApiProperty()
    @IsNumber()
    budget: number;

    @ApiProperty()
    @IsBoolean()
    hasPet: boolean;
}