import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class RecognitionDto {
    @ApiProperty()
    @IsNumber()
    score: number;

    @ApiProperty()
    @IsString()
    name: string;
}