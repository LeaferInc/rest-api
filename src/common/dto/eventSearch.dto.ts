import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsDateString, IsOptional } from "class-validator";

export class EventSearchDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    latitude?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    longitude?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    keywords?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    startDate?: Date;
}