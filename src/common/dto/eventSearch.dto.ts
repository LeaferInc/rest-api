import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDateString, IsOptional, IsLatitude, IsLongitude } from "class-validator";

export class EventSearchDto {
    @ApiProperty()
    @IsLatitude()
    @IsOptional()
    latitude?: number;

    @ApiProperty()
    @IsLongitude()
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