import { IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  messageContent: string;

  @ApiProperty()
  @IsNumber()
  roomId: number;
}
