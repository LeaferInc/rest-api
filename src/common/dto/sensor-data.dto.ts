import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateSensorDataDto{
    @ApiProperty()
    @IsNumber()
    sensorId: number;

    @ApiProperty()
    @IsNumber()
    humidity: number;
}