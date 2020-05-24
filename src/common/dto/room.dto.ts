import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RoomDto {
  @ApiProperty()
  @IsString()
  name: string;
}
