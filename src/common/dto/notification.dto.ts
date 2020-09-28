import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum } from "class-validator";
import { TypeNotification } from "../entity/notification.entity";

export class CreateNotificationDto {

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  href: string;

  @ApiProperty()
  @IsNumber()
  notifier_id: number

  @ApiProperty()
  @IsEnum(TypeNotification)
  type: TypeNotification;
}
