import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateSensorDataDto{
    @ApiProperty()
    @IsNumber()
    sensorId: number;

    @ApiProperty()
    @IsNumber()
    groundHumidity: number;

    @ApiProperty()
    @IsNumber()
    airHumidity: number;

    @ApiProperty()
    @IsNumber()
    temperature: number;
}

export class SensorDataDto{
    createAt: Date;
    id: number;
    groundHumidity: number;
    airHumidity: number;
    temperature: number;
    sensorId: number;
}