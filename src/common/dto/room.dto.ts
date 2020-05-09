import { IsString } from "class-validator";

export class RoomDto {
  @IsString()
  name: string;
}
