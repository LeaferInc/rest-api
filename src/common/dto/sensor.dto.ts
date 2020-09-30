import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSensorDto {
  @ApiProperty()
  @IsNumber()
  plantCollectionId: number;
}

export class SensorDto {
  id: number;
  plantCollectionId: number;
}
