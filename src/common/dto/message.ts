import { IsString, IsNumber } from "class-validator";

export class CreateMessageDto {
  @IsString()
  message_content: string;

  @IsNumber()
  roomId: number;
}
