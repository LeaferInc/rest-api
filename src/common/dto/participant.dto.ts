import { IsNumber } from "class-validator";

export class CreateParticipantDto {
  @IsNumber()
  roomId: number;
}
