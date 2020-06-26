import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreatePlantCollectionDto {
  @ApiProperty()
  @IsNumber()
  plantId: number;
}


export class DeletePlantCollectionDto {
  @ApiProperty()
  @IsNumber()
  plantId: number;
}
