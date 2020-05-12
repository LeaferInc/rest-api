import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  @IsNumber()
  roomId: number;
}
