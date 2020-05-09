import { IsString, IsNumber } from "class-validator";

export class CreateMessageDto {
  @IsString()
  messageContent: string;

  @IsNumber()
  roomId: number;
}
